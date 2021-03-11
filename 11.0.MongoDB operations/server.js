const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const logger=require('morgan');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
const url = "mongodb://localhost:27017/testdb";
const dbConnection = mongoose.createConnection(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const Schema = mongoose.Schema;
const testSchema = new Schema({
  firstname:{
    type:String,
    required:true
  },
  lastname:{
    type:String,
    required:true
  },
  date:{
    type: Date,
    default: Date.now,
    required: true
  },
});

const Test = dbConnection.model("Test", testSchema, "tests");

app.get("/", function (req, res) {
  Test.find()
  .then((tests)=>{
    res.render('index',{tests:tests})
  })
  .catch((error)=>{
    console.log(error)
  })
});

app.post("/tests/form-data", (req, res) => {
  let test = new Test({
    firstname:  req.body.firstname,
    lastname: req.body.lastname,
    date: req.body.date,
  });
  test
    .save(test)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:error
      })
    });
});

app.get("/tests/form-data", (req, res, next) => {
  Test.find()
    .then((test) => {
      res.send(test);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get('/tests/form-data/:id',(req,res,next)=>{
  const query= req.params.id
  Test.findById(query)
  .then((data)=>{
    res.send(data)
  })
  .catch((error)=>{
    res.status(500).send({
      message:error
    })
  })
})

app.put('/tests/form-data/:id',(req,res,next)=>{
  const query= req.params.id
  Test.findByIdAndUpdate(query)
  .then((data)=>{
    res.send(data)
  })
  .catch((error)=>{
    res.status(500).send({
      message:error
    })
  })
})

app.delete('/tests/form-data/:id',(req,res,next)=>{
  const query= req.params.id
  Test.findByIdAndRemove(query)
  .then((data)=>{
    if(!data){
      res.status(404).send({
        message:'User with this id does not exist '
      })
    }else{
      res.send({
        message:'User was delete successfully'
      })
    }
  })
  .catch((error)=>{
    res.status(500).send({
      message:error
    })
  })
})

app.listen(4000);


