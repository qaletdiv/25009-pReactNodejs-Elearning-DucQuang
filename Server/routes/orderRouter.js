const express = require('express'); 
const orderRouter = express.Router(); 
const orderController = require('../controllers/orderController'); 
const authenticateToken = require('../middlewares/authenticateToken/authenticateToken')

orderRouter.post('/createPaymentIntent',authenticateToken, orderController.createPaymentIntent); 
orderRouter.post('/',authenticateToken, orderController.createOrder); 


module.exports = orderRouter