//Modules
const express=require('express');
const router=express.Router();
const passport=require('passport');

//Get Routes
router.get('/',(req,res)=>{
    res.render('index')
})

router.get('/login',(req,res)=>{
    res.render('login')
})

//Post Routes
router.post('/login', passport.authenticate('local', {
    successRedirect : '/dashboard',
    failureRedirect : '/login',
    failureFlash: 'Invalid email or password. Try Again!!!'
}));

module.exports = router;
