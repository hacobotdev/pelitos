const { Schema, model } = require("mongoose");

const RoleSchema = Schema({
    name: {
        type: String,
        required: [true, 'The role attribute name is mandatory']
    }
});

module.exports = model('Role',RoleSchema);