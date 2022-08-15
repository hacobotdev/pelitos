const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user')

const userGet = async (req, res) => {
    const { limit = 5, desde = 0 } = req.query;

    const filter = { status: true };

    const [ total, users ] = await Promise.all([
        User.countDocuments( filter ),
        User.find( filter )
        .limit(limit)
        .skip(desde)
    ])

    res.json({
        total,
        users
    });
};

const userPost = async (req, res) => {
    // Obtain new user values
    const { name, login, password, role } = req.body;
    const user = new User({name, login, password, role});

    // Encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // Save User
    await user.save();

    res.json({
        msg: `User Created`,
        user
    });
};

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

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete
}