const mongoose = require('mongoose');
const { unique } = require('next/dist/build/utils');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : mongoose.Schema.Types.String,
        lowercase : true,
        required : true,
        unique : true,
        validate : {
            validator : function (value) {
                return validator.isEmail(value);
            },
            message : 'Invalid email format'
        }
    },
    password : {
        type : String,
        required : true,
        select : false,
        validate : {
            validator : function (value) {
                return validator.isStrongPassword(value);
            },
            message : 'Password is not strong enough'
        }
    },
    gender : {
        type : String,
        enum : {
            values : ['male', 'female', 'other'],
            message : 'gender must be valid'
        },
    },
    profileURL : {
        type : String,
        default : 'https://cdn.pixabay.com/photo/2013/07/12/14/36/man-148582_1280.png',
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;