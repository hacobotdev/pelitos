const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario')
const { Client } = require('pg');

const usuarioGet = async (req, res) => {
    const { limit = 5, desde = 0 } = req.query;

    const filter = { status: true };

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments( filter ),
        Usuario.find( filter )
        .limit(limit)
        .skip(desde)
    ])

    res.json({
        total,
        usuarios
    });
};

const usuarioPost = async (req, res) => {
    // Obtain new usuario values
    const { nombre, email, password, rol } = req.body;
    const usuario = new Usuario({nombre, email, password, rol});

    // Encrypt password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Save Usuario
    await usuario.save();

    res.json({
        msg: `Usuario Creado`,
        usuario
    });
};

const usuarioPut = async(req, res) => {
    const { id } = req.params;
    const { password, isGoogle, ...body } = req.body;

    if( password ) {
        const salt = bcryptjs.genSaltSync();
        body.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate( id, body );

    res.json({
        msg: `Usuario Modificado`,
        usuario
    });
};

const usuarioDelete = async(req, res) => {
    const { id } = req.params;
    await Usuario.findByIdAndUpdate(id, { activo: false });
    res.json({
        msg: `Usuario Borrado`,
        id
    });
};

const getAll = async (req, res) => {
    const client = new Client({ ssl: { rejectUnauthorized: false } });
    await client.connect()
    const result = await client.query('SELECT * FROM usuarios')
    console.log('result: ', result);
    await client.end()
    res.json(result.rows || [])
}

module.exports = {
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete,
    getAll
}