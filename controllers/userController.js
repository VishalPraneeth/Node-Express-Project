const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


prisma.$connect()
  .then(() => {
    console.log('Prisma Client connected to the database.');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });
// const User = require('../models/usermodel');
//@desc Register a user
//@route POST /api/users/register
//@access Public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
  
    if (!username || !email || !password) {
      res.status(400).json({ error: "Please enter all fields" });
      return;
    }
  
    const userAvailable = await prisma.user.findUnique({
      where: { email },
    });
  
    if (userAvailable) {
      res.status(400).json({ error: "User already exists" });
      return;
    }
  
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    try {
      const user = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });
  
      res.status(201).json({ _id: user.id, email: user.email });
    } catch (error) {
      res.status(400).json({ error: "Invalid user data" });
    }
});
  

//@desc Login user
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    console.log('Login request:', req.body);
  
    if (!email || !password) {
      res.status(400).json({ error: 'Please enter all fields' });
      return;
    }
  
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
  
    console.log('User found:', user);
  
    if (user && (await bcrypt.compare(password, user.password))) {
      const accesstoken = jwt.sign(
        {
          user: {
            username: user.username,
            email: user.email,
            id: user.id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
      );
  
      console.log('Access token:', accesstoken);
  
      res.status(200).json(accesstoken);
    } else {
      res.status(400).json({ error: 'Invalid email or password' });
    }
  });
  
  

//@desc Current user info
//@route GET /api/users/register
//@access Private
const currentUser = asyncHandler(async (req, res) => {
    const userId = req.user.id;
  
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
  
    res.json(user);
});

module.exports = {registerUser, loginUser, currentUser};