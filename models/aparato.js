const { Schema, model } = require("mongoose");

const AparatoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El atributo "nombre" es obligatorio']
    },
    activo: {
        type: Boolean,
        required: [true, 'El atributo "activo" es obligatorio'],
    },
    desc: {
        type: String,
        default: '',
    },
});

module.exports = model('Aparato', AparatoSchema);