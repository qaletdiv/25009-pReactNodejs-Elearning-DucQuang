const express = require('express'); 
const rootRouter = express.Router(); 
const userRouter = require('./userRoute')
const categoryRouter = require('./categoryRoute')
const courseRouter = require('./courseRoute')
const enrollmentRouter = require('./enrollmentRoute')
const levelRouter = require('./LevelRoute')
const reviewRouter = require('./reviewRouter')
const sectionRouter = require('./sectionRoute')
const videoRouter = require('./videoRouter')

rootRouter.use('/users', userRouter)
rootRouter.use('/categories', categoryRouter)
rootRouter.use('/courses', courseRouter)
rootRouter.use('/enrollments', enrollmentRouter)
rootRouter.use('/levels', levelRouter)
rootRouter.use('/reviews', reviewRouter)
rootRouter.use('/sections', sectionRouter)
rootRouter.use('/videos', videoRouter)
module.exports = rootRouter