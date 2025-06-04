const express = require('express'); 
const videoCompletedRouter = express.Router(); 
const videoCompletedController = require('../controllers/videoCompletedController');

videoCompletedRouter.post('/', videoCompletedController.createVideoCompleted);
videoCompletedRouter.get('/:id', videoCompletedController.getVideoCompleted);


module.exports = videoCompletedRouter;