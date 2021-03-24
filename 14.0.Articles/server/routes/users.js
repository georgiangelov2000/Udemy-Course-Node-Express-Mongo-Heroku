const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User } = require('../models/users');

router.get('*',(req, res, next)=> {
  res.locals.user = req.user || null;
  next();
});

router.get('/users/register', async (req, res) => {
    res.render('register');
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
    res.redirect('/users/login');
  })

  router.get('/login', async (req, res) => {
    res.render('login.pug');
  });

  router.post('/login', async (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
  });

  router.get('/logout', async (req, res) => {
    req.logout();
    res.redirect('/users/login');
  });
  
  module.exports=router