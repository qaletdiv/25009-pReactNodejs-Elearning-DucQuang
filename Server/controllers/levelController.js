const {Level} = require('../models')
exports.getAllLevel = async(req, res, next) => {
    try {
        const levels = await Level.findAll()
        res.status(200).json(levels)
    } catch (error) {
        next(error)
    }
}

exports.createNewLevel = async(req, res, next) => {
    try {
        const newLevel = await Level.create(req.body); 
        res.status(201).json({message: "Tạo thành công", newLevel})
    } catch (error) {
        next(error)
    }
}