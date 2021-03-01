//modules
const express=require('express');
const app=express();

const path=require('path');
const bodyParser=require('body-parser');
const dotEnv=require('dotenv');
const mongoose=require('mongoose');
const flash=require('connect-flash');
const session=require('express-session')

//requiring router
const router=require('./routes/router');

//Env File
dotEnv.config({path:'./config.env'});

//Database
mongoose.connect(process.env.DB_LOCAL,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useCreateIndex:true
});

//middleware for session
app.use(session({
secret:'Authentication Project',
resave:true,
saveUninitialized:true
}));

//middleware flash messages
app.use(flash());


//setting middleware globally
app.use((req,res,next)=>{
    res.locals.success_msg=req.flash(('success_msg'));
    res.locals.error_msg=req.flash(('error_msg'));
    next();
});

//setting bodyparser
app.use(bodyParser.urlencoded({extended:true}));

//setting views
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');

//setting middleware router
app.use(router)

app.listen(process.env.PORT,()=>{
    console.log('Server is started')
})