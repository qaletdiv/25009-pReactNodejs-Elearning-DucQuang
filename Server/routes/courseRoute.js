const express = require('express'); 
const courseRouter = express.Router(); 
const courseController = require('../controllers/courseController'); 
const {uploadSingleImage} = require('../middlewares/ImageProcessing/uploadCourseImage')
const imageCoureProcessing = require('../middlewares/ImageProcessing/ImageCourseProcessing')

courseRouter.get('/', courseController.getAllCourses)
courseRouter.get('/:id', courseController.getCourseById)
courseRouter.post('/',uploadSingleImage('image'), imageCoureProcessing.resizeImage, courseController.createNewCourse)

module.exports = courseRouter