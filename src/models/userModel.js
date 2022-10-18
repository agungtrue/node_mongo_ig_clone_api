const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'a user must have a name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'a user must have a email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'a user must have a password'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'a user must have a password'],
        validate: {
            validator: function(el) {
                return el === this.password;
            },
            message: 'password are not the same!!'
        }
    },
    role: {
        type: String,
        default: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});


userSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;

    next();
});

userSchema.methods.validatePassword = async function(clientPassword, userPassword) {
    return await bcrypt.compare(clientPassword, userPassword);
}

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
