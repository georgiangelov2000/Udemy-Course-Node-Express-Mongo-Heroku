const express = require("express");
const router = express.Router();
const Product = require("../model/product-model");

router.get("/", function (req, res) {
  Product.find()
  .then((products)=>{
    res.render('products/index',{products: products})    
  })
  .catch((error)=>{
    console.log(error)
  })
});

router.get("/edit-product/:id", (req, res) => {
  const user_id = { _id: req.params.id };
  Product.findOne(user_id)
    .then((product) => {
      res.render("products/edit-product", { product: product });
    })
    .catch((error) => {
      console.log(error)
    });
});

router.post("/add-product",(req, res) => {
  const product=new Product({
    title:req.body.title,
    description:req.body.description,
    imageUrl:req.body.imageUrl
  });
  product
  .save(product)
  .then((data)=>{
    res.redirect('/')
  })
  .catch((error)=>{
    console.log(error)
    console.log(error)
    res.redirect('/')
  })
});

router.put('/edit-product/:id',(req,res)=>{
  const user_id={_id:req.params.id};
  
  Product.findByIdAndUpdate(user_id,{
    $set: {
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl
    }
  })
  .then((data)=>{
    res.redirect('/')
  })
  .catch((error)=>{
    console.log(error)
    res.redirect('/');
  })
})

router.delete('/product/delete/:id',(req,res)=>{
  const user_id={_id:req.params.id};
  Product.findByIdAndDelete(user_id)
  .then((product)=>{
    res.redirect('/')
  })
  .catch((error)=>{
    console.log(error)
  })
});

module.exports=router