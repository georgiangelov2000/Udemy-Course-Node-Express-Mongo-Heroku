const { request } = require('express');
const express=require('express');
const router=express.Router();
const Employee=require('../model/employees')

router.get('/',(req,res)=>{
    res.render('index')
})

router.get('/employee/new',(req,res)=>{
    res.render('new')
})

router.post('/employee/new',(req,res)=>{
    const newEmployee={
        name:req.body.name,
        designation:req.body.designation,
        salary:req.body.salary,
    }
})
module.exports=router