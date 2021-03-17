const express=require('express');
const dotenv=require('dotenv');
const bodyParser=require('body-parser');
const usersRouter=require('./routes/users');
const indexRouter=require('./routes/index');;
const path=require('path');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const app=express();
const mongoose=require('mongoose');

// Passport Config
require('./config/passport')(passport);

// Express session
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

dotenv.config({path:'./config/config.env'})

//Setting up DB
mongoose.connect(process.env.DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useCreateIndex:true,
    useUnifiedTopology: true
})

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs')
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended:false }));
app.use(usersRouter);
app.use(indexRouter)

app.listen(process.env.PORT,()=>{
    console.log(`Server started`)
});