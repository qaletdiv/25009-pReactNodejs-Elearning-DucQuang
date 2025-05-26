const express = require('express'); 
const reviewRouter = express.Router(); 
const reviewController = require('../controllers/reviewController'); 
const authenticateToken = require('../middlewares/authenticateToken/authenticateToken');



reviewRouter.post('/',authenticateToken, reviewController.createReview);
reviewRouter.get('/', reviewController.getReview);

module.exports = reviewRouter