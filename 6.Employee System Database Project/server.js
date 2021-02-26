//modules
const express=require('express');
const app=express();
const path=require('path');
const dotEnv=require('dotenv');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');

//bodyParser
app.use(bodyParser.urlencoded({extended:true}))

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