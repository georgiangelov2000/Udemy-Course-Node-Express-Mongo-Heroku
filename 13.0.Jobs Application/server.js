const express=require('express');
const app=express();
const dotenv=require('dotenv');
const jobsRouter = require('./routes/jobs');
const connectDatabase=require('./config/database');
const bodyParser=require('body-parser');
const path=require('path');

dotenv.config({path:'./config/config.env'});
connectDatabase();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/api/v1',jobsRouter);

app.set("views", path.join(__dirname, "views"));
app.set('view-engine','ejs')

const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server started on port ${process.env.PORT} in ${process.env.NODE_ENV}`)
})