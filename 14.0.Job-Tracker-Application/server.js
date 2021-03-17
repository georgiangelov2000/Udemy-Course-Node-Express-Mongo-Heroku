const express=require('express');
const dotenv=require('dotenv');
const bodyParser=require('body-parser');
const connectDatabase=require('./config/database');
const usersRouter=require('./routes/users');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const app=express();

dotenv.config({path:'./config/config.env'})
connectDatabase();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs')
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended:false }));
app.use(usersRouter);

app.listen(process.env.PORT,()=>{
    console.log(`Server started ot port ${PORT}`)
});