//Modules
const express=require('express');
const app=express();
const dotenv=require('dotenv');
const path=require('path')

//Router
const router=require('./functionality/routes/router');

// Setting up dotenv
dotenv.config({path:'./config.env'})

//Path
app.set('views',path.join(__dirname,'views'));

//Template
app.set('view engine','ejs')

//Middleware router
app.use(router)



app.listen(process.env.PORT,()=>{
    console.log('Server is started');
})

