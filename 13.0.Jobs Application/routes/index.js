const express=require('express');
const router=express.Router();
const{getHomePage}=require('../controllers/index');

router.route('/').get(getHomePage)

module.exports=router;