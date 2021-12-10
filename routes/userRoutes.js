const express = require('express');
const { registerUser, authUser } = require('../controllers/userControllers');
const authToken = require('../middlewares/authToken')
const User = require('../models/userModel')

const router = express.Router();

router.route('/').post(registerUser);
router.route('/login').post(authUser);

// Fetch user data
router.get('/getUser/:id', async (req, res) => {
        
    try {
        const user = await User.findById(req.params.id)

        return res.status(201).json({
            message: 'Successfully fetch the user data',
            data: user
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        })
    }
})

// Update user Info
router.post('/editUser/:id', async (req, res)=>{
    try {
            const data = await User.findOneAndUpdate({_id: req.params.id}, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            avatarUrl: req.body.avatarUrl,
            bio: req.body.bio
        })

        return res.status(201).json({
            message: 'User succesfully updated',
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