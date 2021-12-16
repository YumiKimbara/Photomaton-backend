const express = require('express');
const { registerUser, authUser, resetPassword, forgotPassword, findUser } = require('../controllers/userControllers');


const router = express.Router();

router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.route('/resetpassword').post(forgotPassword)
router.route('/resetpassword/:userId/:token').post(resetPassword)
router.route('/explore').post(findUser)



module.exports = router;
