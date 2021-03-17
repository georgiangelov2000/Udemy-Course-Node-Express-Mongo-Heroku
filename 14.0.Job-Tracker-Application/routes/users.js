const express = require('express');
const router = express.Router();
const { forwardAuthenticated } = require("../config/auth");

const {getLogin,
    getRegister,
    postRegisterForm,
    login,
    logout
}=require('../controllers/userAuthenticate');

router.route('/register',forwardAuthenticated).get(getRegister);
router.route('/login',forwardAuthenticated).get(getLogin)
router.route('/post').post(postRegisterForm);
router.route('/login').post(login)
router.route('/logout').post(logout)
module.exports=router;