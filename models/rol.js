const { Schema, model } = require("mongoose");

const RolSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El atributo nombre es obligatorio']
    },
    activo: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Rol', RolSchema);