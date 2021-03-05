const express = require('express');
const router = express.Router();

const Product=require('../models/productmodel');

//Get Routes
router.get('/product/new',(req,res)=>{
    res.render('admin-dashboard/newproduct')
})
router.get('/product/update',(req,res)=>{
    res.render('admin-dashboard/update')
})
router.get('/product/instock',(req,res)=>{
    res.render('admin-dashboard/instock')
})

//Post Routes
router.post('/product/new',(req,res)=>{
    const newProduct={
        image:req.body.imageUrl,
        name: req.body.name,
        description:req.body.description,
        price:req.body.price
    };
    Product.create(newProduct)
    .then((product)=>{
        req.flash('success_msg','Product data added to database successfully.')
        res.redirect('/dashboard')
    })
    .catch((error)=>{
        req.flash('error_msg','Error:'+error)
        res.redirect('/newproduct')
    })
})

module.exports = router


