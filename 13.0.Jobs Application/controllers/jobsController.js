const Jobs=require('../models/jobs');

//render Jobs
exports.getJobs=async (req,res,next)=>{
    const jobs= await Jobs.find();
    res.status(200).json({
        success:true,
        results:jobs.length,
        data:jobs
    });
}

//create a new Job
exports.newJob=async (req,res,next)=>{

    const jobs = await Jobs.create(req.body);

    res.status(200).json({
        success:true,
        message:'Job Created',
        data:job
    });

}