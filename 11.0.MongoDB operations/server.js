const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const ok=require('okay');
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
  title:{
    type:String,
    required:true
  },
  text:{
    type:String,
    required:true
  },
  createdAt:{
    type: Date,
    default: Date.now,
    required: true
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  published: Boolean,
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
    title: req.body.title,
    text: req.body.text,
    createdAt:req.body.createdAt,
    updatedAt:req.body.updatedAt
  });
  test
    .save(test)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
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
    console.log(error)
  })
})

app.listen(4000);


app.put('/tests/form-data/:id',(req,res,next)=>{
  const query= req.params.id
  Test.findByIdAndUpdate(query)
  .then((data)=>{
    res.send(data)
  })
  .catch((error)=>{
    console.log(error)
  })
})