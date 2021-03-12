const express=require('express');
const app=express();
const dotenv=require('dotenv');
const bodyParser=require('body-parser');
const morgan=require('morgan');
const path=require('path');
const mongoose=require('mongoose');
const methodOverride=require('method-override')
const navigationRouter=require('./routes/navigation');
const crudOperationsRouter=require('./routes/crud-operations');

dotenv.config({path:'./config.env'})

mongoose.connect(process.env.DB_LOCAL,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useCreateIndex:true,
    useUnifiedTopology: true
})

app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(navigationRouter);
app.use(crudOperationsRouter);

app.listen(process.env.PORT,()=>{
    console.log('Server is started');
})