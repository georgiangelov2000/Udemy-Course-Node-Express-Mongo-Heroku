const mongoose=require('mongoose');

let productScheme=new mongoose.Schema({
    imageUrl:String,
    name:String,
    description:String,
    price:Number
})
 module.exports = mongoose.model('Product', productScheme);