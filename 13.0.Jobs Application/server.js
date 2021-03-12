//Modules
const express=require('express');
const app=express();
const methodOverride=require('method-override');
const bodyParser=require('body-parser');
const dotenv=require('dotenv');
const path=require('path');
const jobsRouter=require('./routes/jobs');
const connectDatabase=require('./config/database');

//config dotenv
dotenv.config({path:'./config/config.env'});

//connect to database
connectDatabase()

//middleware
app.use('view-engine','ejs')
app.use(bodyParser.urlencoded({extended:false}))
app.use(methodOverride('_method'));
app.use('views',path.join(__dirname,'views'))
app.use(express.static('public'))

//jobs router
app.use(jobsRouter);

app.listen(process.env.PORT,()=>{
    console.log('Server started')
});