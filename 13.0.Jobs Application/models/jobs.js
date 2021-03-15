const mongoose = require("mongoose");
const validator = require("validator");
//const slugify=require('slugify');
//const geoCoder=require('../utilities/geocoder');


const jobsSchema = new mongoose.Schema({
  title : {
      type : String,
      required : [true, 'Please enter Job title.'],
      trim : true,
      maxlength : [100, 'Job title can not exceed 100 characters.']
  },
  slug : String,
  description : {
      type : String,
      required : [true, 'Please enter Job description.'],
      maxlength : [1000, 'Job description can not exceed 1000 characters.']
  },
});

/*
// Creating Job Slug before saving
jobsSchema.pre('save', function(next) {
  // Creating slug before saving to DB
  this.slug = slugify(this.title, {lower : true});

  next();
});

// Setting up Location
jobsSchema.pre('save', async function(next) {
  const loc = await geoCoder.geocode(this.address);

  this.location = {
      type : 'Point',
      coordinates : [loc[0].longitude, loc[0].latitude],
      formattedAddress : loc[0].formattedAddress,
      city : loc[0].city,
      state : loc[0].stateCode,
      zipcode : loc[0].zipcode,
      country : loc[0].countryCode
  }
});
*/

module.exports=mongoose.model('Jobs',jobsSchema);
