const express = require('express'); 
const enrollmentRouter = express.Router(); 
const enrollmentController = require('../controllers/enrollmentController'); 

enrollmentRouter.get('/', enrollmentController.getAllEnrollments);
enrollmentRouter.post('/', enrollmentController.createEnrollMent);

module.exports = enrollmentRouter