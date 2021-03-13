const express=require('express');
const router=express.Router();

//import jobs controller functions
const {getJobs,newJob, getJobsInRadius,updateJob}=require('../controllers/jobsController');

router.route('/jobs').get(getJobs);
router.route('/job/new').post(newJob);
router.route('/job/:id').put(updateJob)
router.route('/jobs/:zipcode/:distance').get(getJobsInRadius);
module.exports=router;