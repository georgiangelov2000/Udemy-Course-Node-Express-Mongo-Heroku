const express=require('express');
const app=express();
const methodOverride=require('method-override');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const dotenv=require('dotenv');
const path=require('path');


dotenv.config({path:'./config.env'});

app.use('view-engine','ejs')
app.use(bodyParser.urlencoded({extended:false}))
app.use(methodOverride('_method'));
app.use('views',path.join(__dirname,'views'))
app.use(express.static('public'))

app.listen(process.env.PORT,()=>{
    console.log('Server started')
});