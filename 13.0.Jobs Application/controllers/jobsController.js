const Jobs=require('../models/jobs');

//render Jobs
exports.getJobs=(req,res,next)=>{
    res.status(200).json({
        success:true,
        requestMethod: req.requestMethod,
        message:'This route will display all jobs in future'
    })
}

//create a new Job
exports.newJob=async (req,res,next)=>{

    const job= await Jobs.create(req.body);

    res.status(200).json({
        success:true,
        message:'Job Created',
        data:job
    });

}