const express = require('express'); 
const userRouter = express.Router(); 
const userController = require('../controllers/userController')
const {registerValidationRule, loginValidationRule, emailValidationRule, passwordValidationRule} = require('../validations/userValidator')
const validationErrorHandler = require('../middlewares/ValidationErrorHanlder/validationErrorHandler')
const authenticateToken = require('../middlewares/authenticateToken/authenticateToken')

userRouter.get('/get-me', authenticateToken, userController.getMe)
userRouter.post('/register',registerValidationRule(), validationErrorHandler, userController.createUser)
userRouter.post('/login', loginValidationRule(), validationErrorHandler, userController.login )
userRouter.post('/forgot-password',emailValidationRule(),validationErrorHandler, userController.forgotPassword)
userRouter.post('/reset-password',passwordValidationRule(), validationErrorHandler, userController.resetPassword)

module.exports = userRouter