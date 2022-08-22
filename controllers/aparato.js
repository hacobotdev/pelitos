const bcryptjs = require('bcryptjs');
const Aparato = require('../models/aparato')
//const { Client } = require('pg');
const moment = require('moment-timezone');

const getAll = async (req, res) => {
    const { limit = 20, offset = 0, set_time = 0 } = req.query;

    if(set_time == '1') {
        await Aparato.findOneAndUpdate({nombre: 'conexion'}, 
            {
                nombre: 'conexion',
                activo: true,
                desc: moment().tz("America/Hermosillo").format('MMM DD HH:mm')
            });
    }
    
    const filter = {};
    const [ total, objetos ] = await Promise.all([
        Aparato.countDocuments(filter),
        Aparato.find(filter)
        .limit(limit)
        .skip(offset)
    ])
    let conexion;
    let resObj = {};
    for(let index = 0; index < objetos.length; index++) {
        if(objetos[index].nombre != "conexion")
            resObj[objetos[index].nombre] = objetos[index].activo;
        else 
            conexion = objetos[index].desc;
    }
    res.json({
        hora: moment().tz("America/Hermosillo").format('HH:mm'),
        total: total-1,
        conexion,
        aparatos: { ...resObj }
    });
};

const post = async (req, res) => {
    const { nombre, activo, desc } = req.body;
    const aparato = new Aparato({nombre, activo, desc});
    await aparato.save();
    res.json({
        msg: `Aparato creado`,
        aparato
    });
};

const put = async(req, res) => {
    const { nombre, ...body } = req.body;
    const filter = { nombre };

    const aparato = await Aparato.findOneAndUpdate( filter, body );

    res.json({
        msg: `Aparato modificado`,
        aparato
    });
};

const put_switch = async(req, res) => {
    const filter = { ...(req.params) };
    console.log('filter: ', filter)
    const aparato = await Aparato.findOne(filter);

    await Aparato.findByIdAndUpdate(aparato.id, { activo: !aparato.activo });

    res.json({
        msg: `Aparato intercambiado`,
        aparato: {
            ...filter,
            activo: !aparato?.activo
        }
    });
};

const remove = async(req, res) => {
    const { nombre } = req.params;
    await Aparato.findOneAndDelete({nombre});
    res.json({
        msg: `Aparato borrado`,
        nombre
    });
};

module.exports = {
    getAll, 
    post,
    put,
    put_switch,
    remove
}