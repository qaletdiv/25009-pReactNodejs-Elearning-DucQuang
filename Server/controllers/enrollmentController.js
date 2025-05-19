const {Enrollment} = require('../models')

exports.getAllEnrollments = async(req, res, next) => {
    try {
        const enrollments = await Enrollment.findAll(); 
        res.status(200).json(enrollments)
    } catch (error) {
        next(error)
    }
}

exports.createEnrollMent = async(req, res, next) => {
    try {
        console.log(req.body);
        const newEnrollment = await Enrollment.create(req.body)
        res.status(201).json({message: "Tạo bảng đăng ký thành công", enrollment: newEnrollment})
    } catch (error) {
        console.log(req.body);
        next(error)
    }
}