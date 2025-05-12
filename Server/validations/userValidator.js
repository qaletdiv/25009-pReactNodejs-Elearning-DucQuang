const {body, param} = require('express-validator'); 
const {User} = require('../models')
const registerValidationRule = () => [
    body("username") 
    .notEmpty().withMessage("Tên người dùng không được để trống")
    .isLength({min: 6, max: 255}).withMessage("Tên người dùng phải từ 3 đến 255 ký tự")
    .trim(),

    body('email')
    .notEmpty().withMessage("Email người dùng không được để trống")
    .isEmail().withMessage("Email không hợp lệ hoặc không đúng định dạng")
    .trim()
    .custom(async(email) => {
        const existringEmail = await User.findOne({
            where: {email}
        })
        if(existringEmail) {
            throw new Error ("Email đã tồn tại, vui lòng sử dụng email khác")
        }
    }), 

    body('password')
    .notEmpty().withMessage("Mật khẩu không được để trống")
    .isLength({min: 6, max: 20}).withMessage("Mật khẩu phải từ 6 đến 20 ký tự")
    .trim()
    .matches(/^[A-Z][a-zA-Z0-9]*/).withMessage("Mật khẩu phải bao gồm chữ in hoa, thường và số")
    .matches(/^\S*$/).withMessage("Mật khẩu không được chưa khoảng trắng")
]


module.exports = {registerValidationRule}