const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const authToken = require('../middlewares/authToken');


router.post('/register', async (req, res) => {
    console.log(req.body);

    try {
        const newPassword = await bcrypt.hash(req.body.password, 10);
        // const passwordC = await bcrypt.hash(req.body.passwordConfirmation, 10);
        console.log(newPassword);
        const data = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            email: req.body.email,
            password: newPassword,
            // passwordConfirmation: passwordC,
        })

        return res.status(201).json({
            message: 'User succesfully created',
            data,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        })
    }
})



module.exports = router;