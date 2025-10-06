const express = require('express');
const userRouter = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('../config/passport');
const cookieParser = require('cookie-parser');

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

// User login
userRouter.post('/user/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userPassword = await bcrypt.compare(password, user.password);
        if (!userPassword) {
            return res.status(401).json({ message: 'Invalid password' })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        res.status(200).json({
            message: 'Login successful',
            user: user
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error logging in',
            error: error.message
        })
    }
})

// Google OAuth routes
userRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

userRouter.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({
      message: 'Login successful',
      token,
      user: req.user,
    });
  }
);

module.exports = userRouter;