const express=require('express');
const router=express.Router();

//import jobs controller functions
const {
    getJobs,
    getJobForm,
    newJob,
    getUpdateJob,
    updateJob,
    deleteJob,
    getDetailsForJob
    //getJobsInRadius,
    //getJob,
}=require('../controllers/jobsController');

router.route('/jobs').get(getJobs);
router.route('/job/new').get(getJobForm);
router.route('/job/details/:id').get(getDetailsForJob)
router.route('/job/new').post(newJob);
router.route('/job/:id').get(getUpdateJob)
router.route('/job/:id').put(updateJob)
router.route('/job/:id').delete(deleteJob)

//router.route('job/:id/:slug').get(getJob);
//router.route('/jobs/:zipcode/:distance').get(getJobsInRadius);
module.exports=router ;