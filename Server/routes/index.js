const express = require('express'); 
const rootRouter = express.Router(); 
const userRouter = require('./userRoute')
const categoryRouter = require('./categoryRoute')
const courseRouter = require('./courseRoute')
const enrollmentRouter = require('./enrollmentRoute')
rootRouter.use('/users', userRouter)
rootRouter.use('/categories', categoryRouter)
rootRouter.use('/courses', courseRouter)
rootRouter.use('/enrollments', enrollmentRouter)

module.exports = rootRouter