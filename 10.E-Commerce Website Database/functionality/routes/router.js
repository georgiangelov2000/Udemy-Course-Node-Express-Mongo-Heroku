//Modules
const express=require('express');
const router=express.Router();
const passport=require('passport');
const User=require('../models/usermodel')

// Checks if user is authenticated
function isAuthenticatedUser(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'Please Login first to access this page.')
    res.redirect('/login');
}

//Get Routes
router.get('/',(req,res)=>{
    res.render('index')
})

router.get('/login',(req,res)=>{
    res.render('login')
})

router.get('/dashboard',isAuthenticatedUser,(req,res)=>{
    res.render('dashboard')
})

router.get('/signup',(req,res)=>{
    res.render('signup')
})

router.get('/logout',isAuthenticatedUser,(req,res)=>{
    req.logOut();
    req.flash('success_msg', 'You have been logged out.');
    res.redirect('/login');
})

//Post Routes

//login
router.post('/login', passport.authenticate('local', {
    successRedirect : '/dashboard',
    failureRedirect : '/login',
    failureFlash: 'Invalid email or password. Try Again!!!'
}));

//register
router.post('/signup',(req,res)=>{
    let {name,email,password}=req.body;
    let userData={
        name:name,
        email:email
    };
    User.register(userData,password,(error,data)=>{
        if(error){
            req.flash('error_msg', 'ERROR: '+error);
            res.redirect('/signup');
        }
        else if(userData.name.length<4 || password.length<4){
            req.flash('error_msg', 'Name or Password is too short. Please try again!');
            res.redirect('/signup');
        }
        req.flash('success_msg', 'Account created successfully');
        res.redirect('/signup');
    });
});

//loguot

module.exports = router;
