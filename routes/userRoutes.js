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
            const data = await User.updateOne({_id: req.params.id}, {
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

// Send a friend request
router.put('/friendRequest', async (req, res) => {
    try {
        const sentReqData = await User.updateOne({_id: req.body.senderID}, {
            $push: {
                "friends.sentRequest": { userID: req.body.receiverID }
            }
        })
        const requestData = await User.updateOne({_id: req.body.receiverID}, {
            $push: {
                "friends.request": { userID: req.body.senderID }
            }
        })

        return res.status(201).json({
            message: 'Friend request updated',
            data: {
                sender: sentReqData,
                receiver: requestData
            }
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        })
    }
})

// Reject a friend request
router.put('/friendReject', async (req, res) => {
    try {
        const sentReqData = await User.updateOne({_id: req.body.senderID}, {
            $pull: {
                "friends.sentRequest": { userID: req.body.receiverID }
            }
        })
        const requestData = await User.updateOne({_id: req.body.receiverID}, {
            $pull: {
                "friends.request": { userID: req.body.senderID }
            }
        })

        return res.status(201).json({
            message: 'Friend reject updated',
            data: {
                sender: sentReqData,
                receiver: requestData
            }
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        })
    }
})
// Accept a friend request
router.put('/friendAccept', async (req, res) => {
    try {
        const sentReqData = await User.updateOne({_id: req.body.senderID}, {
            $pull: {
                "friends.sentRequest": { userID: req.body.receiverID }
            }
        })
        const requestData = await User.updateOne({_id: req.body.receiverID}, {
            $pull: {
                "friends.request": { userID: req.body.senderID }
            }
        })

        // Get info from the user
        const getSender = await User.findById(req.body.senderID)
        const getReceiver = await User.findById(req.body.receiverID)

        const senderData = await User.updateOne({_id: req.body.senderID}, {
            $push: {
                "friends.friendsList": {
                    userID: req.body.receiverID,
                    userName: getReceiver.userName,
                    avatarUrl: getReceiver.avatarUrl
                }
            }
        })
        const receiverData = await User.updateOne({_id: req.body.receiverID}, {
            $push: {
                "friends.friendsList": {
                    userID: req.body.senderID,
                    userName: getSender.userName,
                    avatarUrl: getSender.avatarUrl
                }
            }
        })

        return res.status(201).json({
            message: 'Friend accept updated',
            data: {
                sender: sentReqData,
                receiver: requestData
            }
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        })
    }
})

// Remove a friend
router.put('/friendRemove', async (req, res) => {
    try {
        const sentReqData = await User.updateOne({_id: req.body.senderID}, {
            $pull: {
                "friends.friendsList": { userID: req.body.receiverID }
            }
        })
        const requestData = await User.updateOne({_id: req.body.receiverID}, {
            $pull: {
                "friends.friendsList": { userID: req.body.senderID }
            }
        })

        return res.status(201).json({
            message: 'Friend accept updated',
            data: {
                sender: sentReqData,
                receiver: requestData
            }
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        })
    }
})

// Get Notifications
router.get('/getNotifications/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        console.log(user)
        const friReqData = user.friends.request
        const requestArr = friReqData.map(async(item) => {
            const reqUser = await User.findById(item.userID)
            return {username: reqUser.userName, avatar: reqUser.avatarUrl}
        })
        //Start from here
        return res.status(201).json({
            message: 'Successfully fetch notifications',
            data: user.friends
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        })
    }
})

module.exports = router;