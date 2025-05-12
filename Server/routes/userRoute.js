const express = require('express'); 
const userRouter = express.Router(); 
const userController = require('../controllers/userController')
const {registerValidationRule} = require('../validations/userValidator')
const validationErrorHandler = require('../middlewares/ValidationErrorHanlder/validationErrorHandler')

userRouter.post('/register',registerValidationRule(), validationErrorHandler, userController.createUser)

module.exports = userRouter