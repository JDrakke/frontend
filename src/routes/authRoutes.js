const express = require('express');
const router = express.Router(); 
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');


const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';


router.post(
  '/register',
  [
    
    check('email', 'Valid email is required').isEmail(),
    check('password', 'Password with minimum 6 characters is required').isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
     
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        email,
        password: hashedPassword,
      });

      
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  }
);


router.post(
  '/login',
  [
    
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      
      const user = await User.findOne({ email });

      if (!user) {
        console.log('User not found');
        return res.status(404).json({ message: 'User not found.' });
      }

      console.log('User found:', user);

      
      const isMatch = await bcrypt.compare(password, user.password);

      console.log('Password match:', isMatch);

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }

      
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

      
      res.json({
        token,
        user: {
          id: user._id,
          email: user.email,
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  }
);

module.exports = router;
