const express=require('express');
const router=express.Router();
const {
registerUser,
getRegisterForm
}=require('../controllers/authController');

router.route('/register/user').get(getRegisterForm)
router.route('/register/user').post(registerUser)

module.exports=router;