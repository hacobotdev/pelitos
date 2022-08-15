const Role = require('../models/role');
const User = require('../models/user');

const roleIsValid = async( role = '' ) => { 
    const roleExists = await Role.findOne( { name: role } );
    if( !roleExists ) {
            throw new Error(`The role '${ role }' is not valid`);
    }
}

const userLoginExists = async( login = '' ) => { 
    const loginExists = await User.findOne( { login } );
    if(loginExists) {
        throw new Error(`Email '${ login }' already registered`);
    }
}

const userIdExist = async( id = '' ) => { 
    const idExists = await User.findById(id);
    if(!idExists) {
        throw new Error(`There is no user with ID '${ id }'`);
    }
}

module.exports = {
    roleIsValid,
    userLoginExists,
    userIdExist
}