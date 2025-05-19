const {Category} = require('../models')
exports.getAllCategory = async(req, res, next) => {
    try {
        const categories = await Category.findAll()
        res.status(200).json(categories)
    } catch (error) {
        next(error)
    }
}


exports.createNewCategory = async(req, res, next) => {
    try {
        const newCategory = await Category.create(req.body); 
        res.status(201).json({message: "Tạo thành công", newCategory})
    } catch (error) {
        next(error)
    }
}