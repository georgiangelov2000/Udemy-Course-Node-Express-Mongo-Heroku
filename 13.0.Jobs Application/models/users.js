const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcryptjs');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter your name']
    },
    email:{
        type:String,
        required:[true,'Please enter you email address'],
        unique:true,
        validate:[validator.isEmail,'Please enter valid email address']
    },
    password:{
        type:String,
        required:[true,'Please enter password for your account'],
        minLength:[8,'Your password mest be at least 8 characters long'],
        select:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
});

//Enctrypting passwords before saving in datavase
userSchema.pre('save',async function(next){
this.password=await bcrypt.hash(this.password, 10)
})
module.exports=mongoose.model('User',userSchema)
