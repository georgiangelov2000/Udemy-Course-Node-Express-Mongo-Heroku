const express=require('express');
const router=express.Router();
const passport=require('')
//Get Routes

router.get('/login',(req,res)=>{
    res.render('login')
});

router.get('/signup',(req,res)=>{
    res.render('signup')
});

router.get('/dashboard',(req,res)=>{
    res.render('dashboard')
})

//Post Routes

router.post('/signup',(req,res)=>{
    let {name,email,password}=req.body;
    let userData={
        name:name,
        email:email,
        password:password
    };
})

module.exports=router;