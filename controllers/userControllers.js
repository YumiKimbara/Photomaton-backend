const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");



const authUser = asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body;

    const user = await User.findOne({ email } || { userName });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid Email/Username or Password");
    }
});

const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, userName, email, password } = req.body;

    const userExists = await User.findOne({ email } || { userName });

    if (userExists) {
        res.status(400)
        throw new Error("User Already Exists");
    }

    const user = await User.create({
        firstName,
        lastName,
        userName,
        email,
        password,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            email: user.email,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error("Error Occured")
    }
});

module.exports = { registerUser, authUser };