const express = require('express'); 
const rootRouter = express.Router(); 
const userRouter = require('./userRoute')
const categoryRouter = require('./categoryRoute')
const courseRouter = require('./courseRoute')
const enrollmentRouter = require('./enrollmentRoute')
const levelRouter = require('./LevelRoute')
rootRouter.use('/users', userRouter)
rootRouter.use('/categories', categoryRouter)
rootRouter.use('/courses', courseRouter)
rootRouter.use('/enrollments', enrollmentRouter)
rootRouter.use('/levels', levelRouter)

module.exports = rootRouter