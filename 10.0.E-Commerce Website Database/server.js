//Modules
const express=require('express');
const app=express();
const dotenv=require('dotenv');
const path=require('path')
const passport=require('passport');
const mongoose = require('mongoose');
const session=require('express-session')
const flash=require('connect-flash');
const bodyParser=require('body-parser');
const localStrategy=require('passport-local').Strategy;
const methodOverride = require('method-override');
const cookieParser=require('cookie-parser');

//cookie parsers
app.use(cookieParser());

//Overrride Method
app.use(methodOverride('_method'));

//Path
app.set('views',path.join(__dirname,'views'));

//Template
app.set('view engine','ejs')

//Static files
app.use(express.static('public'));

//Setting up bodyparser
app.use(bodyParser.urlencoded({ extended: false }))

//Router
const router=require('./functionality/routes/router');
const DashboardRouter=require('./functionality/routes/dashboard-router');

//User
const User=require('./functionality/models/usermodel')

// Setting up dotenv
dotenv.config({path:'./config.env'})

//Setting up DB
mongoose.connect(process.env.DB_LOCAL,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useCreateIndex:true,
    useUnifiedTopology: true
})

//Setting up session
app.use(session({
    secret : 'Just a simple login/sign up application.',
    resave : true,
    saveUninitialized :true
}));

//Setting up passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy({usernameField:'email'},User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Middleware flash messages
app.use(flash());

//Setting middelware globally
app.use((req, res, next)=> {
    res.locals.success_msg = req.flash(('success_msg'));
    res.locals.error_msg = req.flash(('error_msg'));
    res.locals.error = req.flash(('error'));
    res.locals.currentUser = req.user;
    next();
});

//Middleware router
app.use(router)
app.use(DashboardRouter)

app.listen(process.env.PORT,()=>{
    console.log('Server is started');
})


