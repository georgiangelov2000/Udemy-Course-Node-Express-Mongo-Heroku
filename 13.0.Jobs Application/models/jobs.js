const mongoose = require("mongoose");
const validator = require("validator");

const jobsSchema = new mongoose.Schema({

  title: {
    type: String,
    required: [true, "Please enter job title."],
    trim: true,
    maxLength: [100, "Job title can not exceed 100 characters."],
  },

  slug: String,

  description: {
    type: String,
    required: [true, "Please enter Job description."],
    maxLength: [1000, "Job description can not exceed 1000 characters."],
  },

  email: {
    type: String,
    validate: [validator.isEmail, "Please add a valid email address."],
  },

  adress: {
    type: String,
    required: [true, "Please add an address."],
  },

  companyName: {
    type: String,
    required: [true, "Please add Company."],
  },

  industry: {
    type: [String],
    required: true,
    options: {
      values: [
        "Business",
        "Information Technology",
        "Banking",
        "Education/Training",
        "Telecommunication",
        "Sport Industry",
        "Engineering",
      ],
      message: "Please select correct options for industry.",
    },
  },

  jobType: {
    type: String,
    required: true,
    options: {
      values: ["Permanent", "Temporary", "Internship"],
      message: "Please select correct options for job type.",
    },
  },

  minEducation: {
    type: String,
    required: true,
    options: {
      values: ["Bachalors", "Masters", "PHD"],
      message: "Please select correct options for Education.",
    },
  },

  positions: {
    type: Number,
    default: 1,
  },

  experience: {
    type: String,
    required: true,
    options: {
      value: [
        "No Experience",
        "1 Year - 2 years",
        "2 Year - 5 years",
        "5 Years +",
      ],
      message: "Please select correct option for Experience",
    },
  },

  salary:{
      type:Number,
      required:[true,'Please enter expected salary for this job']
  },

  postingDate:{
      type:Date,
      default:Date.now
  },

  lastDate:{
      type:Date,
      default:new Date().setDate(new Date().getDate()+7)
  },
  
  applicantsApplied:{
      type:[Object],
      select:false,
  }
});

module.exports=mongoose.model('Jobs',jobsSchema);
