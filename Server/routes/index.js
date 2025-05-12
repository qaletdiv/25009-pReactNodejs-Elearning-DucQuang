const express = require('express'); 
const rootRouter = express.Router(); 
const userRouter = require('./userRoute')

rootRouter.use('/users', userRouter)

module.exports = rootRouter