const User=require('../models/users');

exports.getRegisterForm=async(req,res,next)=>{
    res.render('users/register.ejs')
}

//Register a new user => /api/v1/register/user
exports.registerUser= async (req,res,next)=>{
const {name,email,password,role}=req.body;

const user=await User.create({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password
})
user
    .save(user)
    .then((data)=>{
        res.redirect('/api/v1/jobs')
    })
    .catch((error)=>{
        console.log(error)
        res.redirect('/api/v1/jobs')
    })
}