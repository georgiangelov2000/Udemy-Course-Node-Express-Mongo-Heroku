const Jobs=require('../models/jobs');
const geoCoder=require('../utilities/geocoder');

//render Jobs
exports.getJobs=async (req,res,next)=>{
     const jobs= await Jobs.find();
     res.status(200).json({
         success:true,
         results:jobs.length,
         data:jobs
     })
}

//create a new Job
exports.newJob=async (req,res,next)=>{
    const jobs = await Jobs.create(req.body);
    res.status(200).json({
        success:true,
        message:'Job Created',
        data:jobs
    });
}

//Search job with radius => /api/v1/jobs/:zipcode/:distance
exports.getJobsInRadius= async (req,res,next)=>{
    const{ zipcode,distance }=req.params;
    //Getting latitude & longtitude from getcoder with zipcode
    const loc= await geoCoder.geocode(zipcode);
    const latitude=loc[0].latitude;
    const longtitude=loc[0].longitude;

    const radius=distance / 3963

    const jobs=  await Jobs.find({
        location: {$geoWithin:{$centerSphere:[[longtitude,latitude],radius ]}}
    });

};