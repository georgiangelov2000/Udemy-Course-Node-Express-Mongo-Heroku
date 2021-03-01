const mongoose=require('mongoose');

const userScheme=new mongoose.Schema({
    name:String,
    email:String,
    password:{
        type:String,
        select:false
    }
});

module.exports=mongoose.model('User',userScheme);