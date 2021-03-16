const User=require('../models/users');

exports.getRegisterForm=async(req,res,next)=>{
    res.render('users/register.ejs')
}

//Register a new user => /api/v1/register/user
exports.registerUser= async (req,res,next)=>{
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

exports.getLoginForm=async(req,res,next)=>{
res.render('users/login.ejs')
}

//Login user=>/api/v1/login/user
exports.loginUser= async(req,res,next)=>{
const {email,password}=req.body;

//Cheks if email or password entered by user;
    if(!email || !password){
        res.redirect('/api/v1/jobs')
    }

    //Finding user in database
    const user=await User.findOne({ email} ).select('+password');

    if(!user){
        return res.redirect('/api/v1/jobs')
    }

    //Check if password is correct
    const isPasswordMatched=await user.comparePassword(password)
    if(!isPasswordMatched){
        return res.redirect('/api/v1/jobs')
    }

    //Create Json Web Token
 //   const token=user.JWT();
    res.status(200).json({
        success:true,
        message:"Hello"
      //  token
    })
}