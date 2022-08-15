const { Schema, model } = require("mongoose");

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'The user attribute name is mandatory']
    },
    login: {
        type: String,
        required: [true, 'The user attribute login is mandatory'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'The user attribute password is mandatory']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status: {
        type: Boolean,
        default: true
    },
    isGoogle: {
        type: Boolean,
        default: false
    }
});

UserSchema.methods.toJSON = function() {
    const { __v, password, ...user } = this.toObject();
    return user;
}

module.exports = model('User',UserSchema);