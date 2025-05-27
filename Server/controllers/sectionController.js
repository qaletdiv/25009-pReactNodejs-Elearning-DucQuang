const {Section} = require('../models')

exports.getAllSection = async (req, res, next) => {
    try {
        const sections = await Section.findAll();
        res.status(200).json(sections);
    } catch (error) {
        next(error);
    }
}

exports.createNewSection = async (req, res, next) => {
    try {
        const newSection = await Section.create(req.body);
        res.status(201).json({ message: "Tạo thành công", newSection });
    } catch (error) {
        next(error);
    }
}

exports.getSectionById = async (req, res, next) => {
    try {
        const section = await Section.findByPk(req.params.id);
        if (!section) {
            return res.status(404).json({ message: "Không tìm thấy phần" });
        }
        res.status(200).json({ section });
    } catch (error) {
        next(error);
    }
}

