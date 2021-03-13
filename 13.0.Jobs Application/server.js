const express=require('express');
const app=express();
const dotenv=require('dotenv');
const jobsRouter = require('./routes/jobs');
const connectDatabase=require('./config/database');

dotenv.config({path:'./config/config.env'});
connectDatabase();

app.use(express.json());

app.use('/api/v1',jobsRouter);

const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server started on port ${process.env.PORT} in ${process.env.NODE_ENV}`)
})