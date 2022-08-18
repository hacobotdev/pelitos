const bcryptjs = require('bcryptjs');
const Aparato = require('../models/aparato')
//const { Client } = require('pg');
const moment = require('moment-timezone');

const getAll = async (req, res) => {
    const { limit = 20, offset = 0 } = req.query;
    const filter = {};
    const [ total, objetos ] = await Promise.all([
        Aparato.countDocuments(filter),
        Aparato.find(filter)
        .limit(limit)
        .skip(offset)
    ])
    let resObj = {};
    for(let index = 0; index < objetos.length; index++) {
        resObj[objetos[index].nombre] = objetos[index].activo ? "ON" : "OFF";
    }
    res.json({
        hora: moment().tz("America/Hermosillo").format('HH:mm'),
        total,
        ...resObj
    });
};

const post = async (req, res) => {
    const { nombre, activo } = req.body;
    const aparato = new Aparato({nombre, activo});
    await aparato.save();
    res.json({
        msg: `Aparato Creado`,
        aparato
    });
};

const put = async(req, res) => {
    const { nombre, ...body } = req.body;
    const filter = { nombre };

    const aparato = await Aparato.findOneAndUpdate( filter, body );

    res.json({
        msg: `Aparato Modificado`,
        aparato
    });
};

const put_switch = async(req, res) => {
    const filter = { ...(req.params) };
    console.log('filter: ', filter)
    const aparato = await Aparato.findOne(filter);

    await Aparato.findByIdAndUpdate(aparato.id, { activo: !aparato.activo });

    res.json({
        msg: `Aparato Cambiado`,
        aparato: {
            ...filter,
            activo: !aparato?.activo
        }
    });
};

module.exports = {
    getAll, 
    post,
    put,
    put_switch
}