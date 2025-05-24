const {Level} = require('../models')
exports.createNewLevel = async(req, res, next) => {
    try {
        const newLevel = await Level.create(req.body); 
        res.status(201).json({message: "Tạo thành công", newLevel})
    } catch (error) {
        next(error)
    }
}