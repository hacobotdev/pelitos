const Rol = require('../models/rol');
const Usuario= require('../models/usuario');

const rolEsValido = async( rol = '' ) => { 
    const rolExiste = await Rol.findOne( { name: rol } );
    if( !rolExiste ) {
            throw new Error(`El rol '${ rol }' no es válido`);
    }
}

const usuarioEmailExiste = async( email = '' ) => { 
    const emailExists = await Usuario.findOne( { email } );
    if(emailExists) {
        throw new Error(`El Email '${ email }' ya se encuentra registrado`);
    }
}

const usuarioIdExiste = async( id = '' ) => { 
    const idExiste = await Usuario.findById(id);
    if(!idExiste) {
        throw new Error(`No existe un usuario con ID '${ id }'`);
    }
}

module.exports = {
    rolEsValido,
    usuarioEmailExiste,
    usuarioIdExiste
}