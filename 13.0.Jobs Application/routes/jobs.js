const express=require('express');
const router=express.Router();

//import jobs controller functions
const {getJobs,
    newJob,
    getJobForm,
    getJobsInRadius,
    updateJob,
    deleteJob,
    getJob
}=require('../controllers/jobsController');

router.route('/jobs').get(getJobs);
router.route('/job/new').get(getJobForm);
router.route('job/:id/:slug').get(getJob);
router.route('/job/new').post(newJob);
router.route('/job/:id')
.put(updateJob)
.delete(deleteJob)
router.route('/jobs/:zipcode/:distance').get(getJobsInRadius);
module.exports=router ;