//modules
const express=require('express');
const app=express();
const path=require('path');
const dotEnv=require('dotenv');
const mongoose=require('mongoose');
const methodOverride = require('method-override');
const bodyParser=require('body-parser');
const session=require('express-session');
const flash=require('connect-flash');

//bodyParser
app.use(bodyParser.urlencoded({extended:true}))

//connect flash
app.use(flash())

//session
app.use(session({
    secret:"nodejs",
    resave:true,
    saveUninitialized:true
}));

//Setting Messages variables globally
app.use((req,res,next)=>{
res.locals.success_message=req.flash(('success_message'));
res.locals.error_message=req.flash(('error_message'));
next();
})

//Overrride Method
app.use(methodOverride('_method'));

//connecting to Enviroment Variavles
dotEnv.config({path:'./config.env'});

//connecting to MONGODB database
mongoose.connect(process.env.DATABASE_LOCAL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
});

//UI adjustment
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

//Router
const router=require('./controllers/routes/router')
app.use(router);


const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`Server listening on port ${port}`)
})