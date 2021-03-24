const express=require('express');
const app=express();
const dotenv=require('dotenv');
const jobsRouter = require('./routes/jobs');
const indexRouter=require('./routes/index');
const connectDatabase=require('./config/database');
const session=require('express-session');
const path=require('path');
const flash=require('connect-flash');
const bodyParser=require('body-parser');
const methodOverride=require('method-override');


dotenv.config({path:'./config/config.env'});
connectDatabase();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret:"nodejs",
    resave:true,
    saveUninitialized:true
}));

app.use(flash());
app.use((req,res,next)=>{
    res.locals.success_message=req.flash(('success_message'));
    res.locals.error_message=req.flash(('error_message'));
    next();
});

app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use('/api/v1',jobsRouter);
app.use(indexRouter);
app.set("views", path.join(__dirname, "views"));
app.set('view-engine','ejs');

const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server started on port ${process.env.PORT} in ${process.env.NODE_ENV}`)
})