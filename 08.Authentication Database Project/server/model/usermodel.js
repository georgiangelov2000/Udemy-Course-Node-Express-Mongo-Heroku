const mongoose=require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose');

//create UserScheme
const userScheme=new mongoose.Schema({
    name:String,
    email:String,
    password:{
        type:String,
        select:false
    },
    //forgot password
    resetPasswordToken:String,
    resetPasswordExpires:Date
});

userScheme.plugin(passportLocalMongoose,{usernameField:'email'});
module.exports=mongoose.model('User',userScheme);