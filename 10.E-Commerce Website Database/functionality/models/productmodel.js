const mongoose=require('mongoose');

let productsScheme=new mongoose.Schema({
    imageUrl:String,
    name:String,
    description:String,
    price:Number
})
// module.exports = mongoose.model('Product', productScheme);