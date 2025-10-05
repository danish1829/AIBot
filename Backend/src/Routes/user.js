const express = require('express');
const userRouter = express.Router();
const User = require('./../models/user');
const bcrypt = require('bcrypt');

// Create a new user
userRouter.post('/user/signup', async (req, res) => {
    try {
        const { firstName, lastName, email, password, gender, profileURL } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password : hashedPassword,
            gender,
            profileURL
        });
        await newUser.save();

        res.status(201).json({
            message : 'User created successfully',
            user : newUser
        })
    } catch (error) {
        res.status(500).json({
            message : 'Error creating user',
            error : error.message
        })
    }
})