const express = require('express'); 
const categoryRouter = express.Router(); 
const categoryController = require('../controllers/categoryController'); 

categoryRouter.get('/', categoryController.getAllCategory)
categoryRouter.post('/', categoryController.createNewCategory)

module.exports = categoryRouter