const express = require('express'); 
const levelRouter = express.Router(); 
const levelController = require('../controllers/levelController'); 


levelRouter.post('/', levelController.createNewLevel)
levelRouter.get('/', levelController.getAllLevel)

module.exports = levelRouter