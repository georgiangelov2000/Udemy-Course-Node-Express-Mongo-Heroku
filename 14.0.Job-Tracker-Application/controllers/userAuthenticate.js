const User = require("../model/usermodel");
const bcrypt=require('bcrypt');
const passport=require('passport');

exports.getRegister = (req, res, next) => {
    res.render("users/register");
  };  
exports.getLogin = (req, res, next) => {
  res.render("users/login");
};

exports.postRegisterForm=(req,res,next)=>{
    const { name, email, password, password2 } = req.body;
    let errors = [];

    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }
    
    if(errors.length>0){
        res.render('users/register',{
            errors,
            name,
            email,
            password,
            password2
        })
    } else{
        User.findOne({email:email}).then(user=>{

            if(user){
                errors.push({ msg: 'Email already exists' });
                res.render('users/register',{
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            }else {

                const newUser = new User({
                    name,
                    email,
                    password
                });

                bcrypt.genSalt(10,(error,salt)=>{
                    bcrypt.hash(newUser.password,salt,(error,hash)=>{
                        newUser.password=hash;
                        newUser
                        .save()
                        .then(user=>{
                            req.flash(
                                'success_msg',
                                'You are now registered and can log in'
                            );
                            res.redirect('/login');
                        })
                        .catch(err => console.log(err));
                    })
                })
            }
        })
    }
}

exports.login=(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })
}

exports.logout=('/logout',(req,res)=>{
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
})