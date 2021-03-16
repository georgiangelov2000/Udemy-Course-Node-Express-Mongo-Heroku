const Jobs=require('../models/jobs');
const geoCoder=require('../utilities/geocoder');

//render Jobs
exports.getJobs=async (req,res,next)=>{
    
     await Jobs.find()
     .then((jobs)=>{
         res.render('jobs/index.ejs',{jobs:jobs})
     })
     .catch((error)=>{
         res.redirect('/api/v1/jobs')
     })
};

//get Job formapi/v1/jobs
exports.getJobForm=(req,res,next)=>{
    res.render('jobs/new-job.ejs')
};

//create a new Job api/v1/job/new
exports.newJob=async (req,res,next)=>{
    const jobs = await Jobs.create({
        title:req.body.title,
        description:req.body.description,
        email:req.body.email,
        address:req.body.address,
        company:req.body.company,
        salary:req.body.salary,
        postingDate:req.body.postingDate,
        lastDate:req.body.lastDate
    })
    jobs
    .save(jobs)
    .then((data)=>{
        res.redirect('/api/v1/jobs')
    })
    .catch((error)=>{
        console.log(error)
        res.redirect('/api/v1/jobs')
    })
};

//get updateJob => api/v1/job/:id/
exports.getUpdateJob=async (req,res,next)=>{
    const job= { _id: req.params.id };
  await  Jobs.findOne(job)
      .then((job) => {
        res.render("jobs/edit-job.ejs", { job:job });
      })
      .catch((error) => {
        console.log(error)
        res.redirect('/api/v1/jobs')
      });
};

//Update a job =>/api/v1/job/:id
exports.updateJob=async (req,res,next)=>{
    const job={_id:req.params.id};

   await Jobs.findByIdAndUpdate(job,{
        $set: {
            title:req.body.title,
            description:req.body.description,
            email:req.body.email,
            address:req.body.address,
            company:req.body.company,
            salary:req.body.salary,
        }
      })
      .then((data)=>{
        res.redirect('/api/v1/jobs')
      })
      .catch((error)=>{
        console.log(error)
        res.redirect('/api/v1/jobs');
      })
};

//Delete a job => /api/v1/job/:id
exports.deleteJob= async (req,res,next)=>{
    const job={_id:req.params.id};
    Jobs.findByIdAndDelete(job)
    .then((job)=>{
        res.redirect('/api/v1/jobs')
    })
    .catch((error)=>{
        console.log(error)
        res.redirect('/api/v1/jobs')
    })
};

exports.getDetailsForJob= async(req,res,next)=>{
    const job= { _id: req.params.id };
    await  Jobs.findOne(job)
      .then((job) => {
        res.render("jobs/details.ejs", { job:job });
      })
      .catch((error) => {
        console.log(error)
        res.redirect('/api/v1/jobs')
      });
};

//Get a single job with id and slug=> /api/v1/job/:id/slug
exports.getJob=async(req,res,next)=>{
const job= await Jobs.find({ $and: [{_id:req.params.id} , {slug:req.params.slug}] })
    if(!job || job.length===0){
        return res.status(404)/json({
            success:false,
            message:'Job not found'
        })
    }   
    res.status(200).json({
        success:true,
        data:job
    })
};

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