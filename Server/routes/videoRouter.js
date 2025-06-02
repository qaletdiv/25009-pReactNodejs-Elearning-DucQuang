const express = require('express'); 
const videoRouter = express.Router(); 
const videoController = require('../controllers/videoController')
const {uploadSingleVideo } = require("../middlewares/VideoProcessing/uploadCourseVideo")
const videoCourseProcessing = require('../middlewares/VideoProcessing/videoCourseProcessing')
videoRouter.post('/', uploadSingleVideo("path"), videoCourseProcessing.processVideo, videoController.createVideo);

module.exports = videoRouter;