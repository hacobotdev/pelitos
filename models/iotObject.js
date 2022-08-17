const { Schema, model } = require("mongoose");

const IoTObjectSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El atributo "nombre" es obligatorio']
    },
    activo: {
        type: Boolean,
        required: [true, 'El atributo "activo" es obligatorio'],
    }
});

module.exports = model('IoTObject',IoTObjectSchema);