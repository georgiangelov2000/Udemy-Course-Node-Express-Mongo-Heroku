const express = require('express');
const router = express.Router();

const Product=require('../models/productmodel');

//Get Routes
router.get('/product/new',(req,res)=>{
    res.render('newproduct')
})
router.get('/product/update',(req,res)=>{
    res.render('admin-dashboard/update')
})

module.exports = router


