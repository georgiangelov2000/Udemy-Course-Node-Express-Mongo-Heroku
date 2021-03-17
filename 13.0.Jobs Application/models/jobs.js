const mongoose = require("mongoose");
const validator = require("validator");

const jobsSchema = new mongoose.Schema({
  title : {
      type : String,
      required : true,
      trim : true,
      maxlength :100
  },
  slug : String,
  description : {
      type : String,
      required :true,
      maxlength :1000
  },
  email : {
    type : String,
    validate :[validator.isEmail, 'Please add a valid email address.']
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
  applicantsApplied : {
    type : [Object],
    select : false
  },
});

module.exports=mongoose.model('Jobs',jobsSchema);
