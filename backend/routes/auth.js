const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { email, password, firstName, lastName, mobile } = req.body;
    
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        error: 'Email already registered',
        field: 'email'
      });
    }

    // Create new user
    const user = new User({ email, password, firstName, lastName, mobile });
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    if (error.name === 'ValidationError') {
      // Handle mongoose validation errors
      const errors = Object.keys(error.errors).map(key => ({
        field: key,
        error: error.errors[key].message
      }));
      return res.status(400).json({ errors });
    } else if (error.code === 11000) {
      // Handle duplicate key error
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({ 
        error: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`,
        field: field
      });
    }
    res.status(500).json({ error: 'Error creating user', details: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ 
        error: 'Email not found',
        field: 'email'
      });
    }

    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ 
        error: 'Incorrect password',
        field: 'password'
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.json({ 
      token, 
      user: { 
        id: user._id, 
        email: user.email, 
        firstName: user.firstName, 
        lastName: user.lastName, 
        mobile: user.mobile 
      } 
    });
  } catch (error) {
    res.status(400).json({ error: 'Login failed', details: error.message });
  }
});

module.exports = router;

