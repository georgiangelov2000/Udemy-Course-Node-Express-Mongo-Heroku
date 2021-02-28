//Modules
const express=require('express');
const app=express();
const path=require('path');
const mongoose=require('mongoose');
const multer=require('multer');
const methodOverride=require('method-override');

//Connect to database
mongoose.connect("mongodb://localhost:27017/images",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
});

//Create  Schema
const imageScheme=mongoose.Schema({
    imageUrl:String
});

//Create model
const Picture=mongoose.model('Picture',imageScheme);

//Setup path and static files
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(methodOverride('_method'));

app.get('/upload',(req,res)=>{
    res.render('upload');
})

app.get('/',(req,res)=>{
    res.render('index')
})

app.listen(3000,()=>{
    console.log('Server is started on port 3000.')
})