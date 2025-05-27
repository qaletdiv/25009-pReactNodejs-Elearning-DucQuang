const express = require('express'); 
const sectionRouter = express.Router(); 
const sectionController = require('../controllers/sectionController'); 

sectionRouter.post('/', sectionController.createNewSection);
sectionRouter.get('/', sectionController.getAllSection);
sectionRouter.get('/:id', sectionController.getSectionById);

module.exports = sectionRouter;