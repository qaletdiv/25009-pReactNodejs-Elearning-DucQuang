const express = require('express'); 
const userRouter = express.Router(); 
const userController = require('../controllers/userController')
const {registerValidationRule, loginValidationRule, emailValidationRule, passwordValidationRule} = require('../validations/userValidator')
const validationErrorHandler = require('../middlewares/ValidationErrorHanlder/validationErrorHandler')
const authenticateToken = require('../middlewares/authenticateToken/authenticateToken')
const {uploadSingleImage} = require('../middlewares/ImageProcessing/uploadCourseImage')
const imageCoureProcessing = require('../middlewares/ImageProcessing/ImageCourseProcessing')


userRouter.get('/get-me', authenticateToken, userController.getMe)
userRouter.post('/register',registerValidationRule(), validationErrorHandler, userController.createUser)
userRouter.post('/login', loginValidationRule(), validationErrorHandler, userController.login )
userRouter.post('/forgot-password',emailValidationRule(),validationErrorHandler, userController.forgotPassword)
userRouter.post('/reset-password',passwordValidationRule(), validationErrorHandler, userController.resetPassword)
userRouter.get('/user-course-enroll/',authenticateToken, userController.userCourseEnroll)
userRouter.get('/user-course-enroll/course/:courseId/sections/', authenticateToken, userController.userCourseEnrollBySection)
userRouter.get('/user-course-enroll/course/:courseId/section/:sectionId/videos', authenticateToken, userController.getVideoBySectionUserCourse)
userRouter.patch('/update-user-profile', authenticateToken,uploadSingleImage('userImage'), imageCoureProcessing.resizeImage, userController.updateUserProfile)
userRouter.get("/user-profile", authenticateToken, userController.getUserProfile)
userRouter.patch("/change-password", authenticateToken, userController.changePassword)
module.exports = userRouter