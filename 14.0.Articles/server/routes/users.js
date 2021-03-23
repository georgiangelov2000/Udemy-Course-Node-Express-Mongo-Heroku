const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User } = require('../models/users');

router.get('*',(req, res, next)=> {
  res.locals.user = req.user || null;
  next();
});

router.get('/register', async (req, res) => {
    res.render('register.pug');
  });

  router.get('/login', async (req, res) => {
    res.render('login.pug');
  });

  router.get('/layout', async (req, res) => {
    res.render('layout');
  });

  router.get('/logout', async (req, res) => {
    req.logout();
    res.redirect('/login');
  });


  router.post('/register', async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    const salt = await bcrypt.genSalt(10);
    const newUser =await User.create({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: await bcrypt.hash(req.body.password, salt)
    })
    newUser.save();
    res.redirect('/login');
  })


  router.post('/login', async (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true
    })(req, res, next);
  });

  
  module.exports=router