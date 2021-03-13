const mongoose = require("mongoose");
const validator = require("validator");
const slugify=require('slugify');
const geoCoder=require('../utilities/geocoder');

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

  location:{

    type:{
      type:String,
      options:['Point']
    },

    coordinates:{
      type:[Number],
      index:'2dsphere'
    },
    formattedAddress:String,
    city:String,
    state:String,
    zipcode:String,
    country:String,
  },

  address: {
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
      values: [
        "Bachalors", 
        "Masters", 
        "PHD"
      ],
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
        "2 Years - 5 years",
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

//Creating Jon Slug before saving
jobsSchema.pre('save',function(next){
  //Create slug before saving to DB
  this.slug=slugify(this.title,{lower:true});
  next();
})


//Setting up Location
jobsSchema.pre('save',async (next)=>{
  const loc= await geoCoder.geocode(this.address);

  this.location={
    type:'Point',
    coordinates:[loc[0].longtitude,loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    city:loc[0].city,
    state:loc[0].stateCode,
    zipcode:loc[0].zipcode,
    country:loc[0].countryCode
  }

})

module.exports=mongoose.model('Jobs',jobsSchema);
