const bcryptjs = require('bcryptjs');
const IoTObject = require('../models/iotObject')
//const { Client } = require('pg');
const moment = require('moment-timezone');

const getAll = async (req, res) => {
    const { limit = 20, offset = 0 } = req.query;

    const filter = {};

    const [ total, objetos ] = await Promise.all([
        IoTObject.countDocuments(filter),
        IoTObject.find(filter)
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
    // Obtain new user values

    console.log('req.body: ', req.body)

    const { nombre, activo } = req.body;
    const iotObject = new IoTObject({nombre, activo});

    // Save IoTObject
    await iotObject.save();

    res.json({
        msg: `IoTObject Created`,
        iotObject
    });
};
/*
const userPut = async(req, res) => {
    // Obtains user values
    const { id } = req.params;
    const { password, isGoogle, ...body } = req.body;

    if( password ) {
        const salt = bcryptjs.genSaltSync();
        body.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate( id, body );

    res.json({
        msg: `User Updated`,
        user
    });
};

const userDelete = async(req, res) => {
    const { id } = req.params;
    await User.findByIdAndUpdate(id, { status: false });

    res.json({
        id
    });
};

const getAll = async (req, res) => {
    const client = new Client({ ssl: { rejectUnauthorized: false } });
    await client.connect()
    const result = await client.query('SELECT * FROM users')
    console.log('result: ', result);
    await client.end()
    res.json(result.rows || [])
}
*/
module.exports = {
    getAll, 
    post
}