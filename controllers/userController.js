const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/usermodel');
//@desc Register a user
//@route POST /api/users/register
//@access Public
const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password) {
        res.status(404);
        throw new Error("Please enter all fields");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(404);
        throw new Error("User already exists");
    }
    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    console.log(`User created successfully ${user}`);
    if(user){
        res.status(201).json({_id: user._id, email: user.email});
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
    res.json({message: "Register the user"});
});

//@desc Login user
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error("Please enter all fields");
    }
    const user = await User.findOne({email: email});
    //compare the email and password
    if(user && (await bcrypt.compare(password, user.password))){
        const accesstoken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user._id,
            },

        }, process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "15m"}
        );
        res.status(200).json(accesstoken);

    } else {
        res.status(400);
        throw new Error("Invalid email or password");
    }
    res.json({message: "Login user"});
});

//@desc Current user info
//@route GET /api/users/register
//@access Private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

module.exports = {registerUser, loginUser, currentUser};