const express=require('express');
const router=express.Router();
const {
registerUser,
getRegisterForm,
loginUser,
getLoginForm
}=require('../controllers/authController');

router.route('/register/user').get(getRegisterForm)
router.route('/register/user').post(registerUser)
router.route('/login/user').get(getLoginForm)
router.route('/login/user').post(loginUser)
module.exports=router;