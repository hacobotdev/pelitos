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

module.exports = {
    getAll, 
    post
}