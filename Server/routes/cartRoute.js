const express = require('express'); 
const cartRoute = express.Router(); 
const cartController = require('../controllers/cartController') 
const authenticateToken = require('../middlewares/authenticateToken/authenticateToken')

cartRoute.get('/', authenticateToken, cartController.getCart)
cartRoute.post('/', authenticateToken, cartController.addToCart)
cartRoute.delete('/remove/:cartItemId',authenticateToken, cartController.removeFromCart)
cartRoute.delete('/clear', authenticateToken, cartController.clearCart)

module.exports = cartRoute