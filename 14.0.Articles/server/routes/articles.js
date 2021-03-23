const express = require('express');
const router = express.Router();
const {Article}=require('../models/article');
const { User }=require('../models/users');

router.get('/',(req,res)=>{
    Article.find({},(error,articles)=>{
        if(error){
            return res.send(error)
        }else{
            res.render('index',{
                title: 'Articles',
                articles:articles
            })
        }
    })
})

router.get('/add-article',ensureAuthenticated,async(req,res)=>{
    res.render('add-article',{
        title:'Add Article'
    })
})

router.get('/articles/:id',async(req,res)=>{
    const article=await Article.findById(req.params.id);
    const user=await User.findById(article.author);

    if(user){
        res.render('article',{
            article:article,
            author:user.name
        })
    }
})

router.post('/add-article',async(req,res)=>{
    const article=await Article.create({
        title: req.body.title,
        author: req.user._id,
        body: req.body.body,
    });
    article
    .save(article)
    .then((data)=>{
        console.log(data)
        res.redirect('/add-article')
    })
    .catch((error)=>{
        return res.send(error)
    });
})

// Access Control
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/login');
    }
  }


module.exports=router;