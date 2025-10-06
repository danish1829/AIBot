const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true 
    },
    lastName: {
        type: String,
        required: true,
        trim: true 
    },
    email: {
        type: String, 
        lowercase: true,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value);
            },
            message: 'Invalid email format'
        }
    },
    password: {
        type: String,
        required: true,
        select: false,
        validate: {
            validator: function (value) {
                return validator.isStrongPassword(value);
            },
            message: 'Password is not strong enough'
        }
    },
    googleId: {
               type: String,
               unique: true,
               sparse: true
          },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female', 'other'],
            message: 'Gender must be valid'
        },
    },
    profileURL: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2013/07/12/14/36/man-148582_1280.png',
        validate: {
            validator: function (value) {
                return validator.isURL(value);
            },
            message: 'Invalid URL format'
        }
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
