const mongoose = require("mongoose");

const jobsSchema = new mongoose.Schema({
  title : {
      type : String,
      required : true,
      trim : true,
  },
  slug : String,
  description : {
      type : String,
      required :true,
  },
  email : {
    type : String,
    required :true,
    trim:true
  },
  address : {
    type : String,
    required :true
  },
  company : {
    type : String,
    required :true
  },
  salary : {
    type : Number,
    required : true
  },
  postingDate : {
    type : Date,
    default : Date.now
  },
  lastDate : {
    type : Date,
    default : new Date().setDate(new Date().getDate() + 7)
  },
});

module.exports=mongoose.model('Jobs',jobsSchema);
