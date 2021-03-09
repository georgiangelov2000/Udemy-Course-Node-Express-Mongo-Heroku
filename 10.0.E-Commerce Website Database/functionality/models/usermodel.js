const mongoose=require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose');

let userSheme=new mongoose.Schema({
    name:String,
    email:String,
    password:{
        type:String,
        select:false
    },
    resetPasswordToken : String,
    resetPasswordExpires : Date
})
userSheme.plugin(passportLocalMongoose,{usernameField:'email'});
module.exports=mongoose.model('User',userSheme)