const mongoose=require('mongoose');

let productSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    imageUrl:{
        type:String,
        required:true,
        trim:true
    }
})

module.exports=mongoose.model('Product',productSchema);