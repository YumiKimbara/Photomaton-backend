const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const authToken = require('../middlewares/authToken');

// Fetch user Info
router.get('/getInfo', authToken, async (req, res) => {
        
    try {
        const user = await User.find({email: req.user.email})

        return res.status(201).json({
            message: 'Successfully fetch the user data',
            data: user,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        })
    }
})

// Update user Info
// router.post('/editUser', authToken, async (req, res)=>{
//         try {
//         const newPassword = await bcrypt.hash(req.body.password, 10);
//         // const passwordC = await bcrypt.hash(req.body.passwordConfirmation, 10);
//         console.log(newPassword);
//         const data = await User.create({
//             firstName: req.body.firstName,
//             lastName: req.body.lastName,
//             userName: req.body.userName,
//             password: newPassword,
//             // passwordConfirmation: passwordC,
//         })

//         return res.status(201).json({
//             message: 'User succesfully created',
//             data,
//         });
//     }
//     catch (error) {
//         return res.status(500).json({
//             message: error.message,
//         })
//     }
// })



module.exports = router;
