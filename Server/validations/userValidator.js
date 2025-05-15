const { body, param } = require("express-validator");
const { User } = require("../models");
const registerValidationRule = () => [
  body("username")
    .notEmpty()
    .withMessage("Tên người dùng không được để trống")
    .isLength({ min: 6, max: 255 })
    .withMessage("Tên người dùng phải từ 3 đến 255 ký tự")
    .trim(),

  body("email")
    .notEmpty()
    .withMessage("Email người dùng không được để trống")
    .isEmail()
    .withMessage("Email không hợp lệ hoặc không đúng định dạng")
    .trim()
    .custom(async (email) => {
      const existringEmail = await User.findOne({
        where: { email },
      });
      if (existringEmail) {
        throw new Error("Email đã tồn tại, vui lòng sử dụng email khác");
      }
    }),

  body("password")
    .notEmpty()
    .withMessage("Mật khẩu không được để trống")
    .isLength({ min: 6, max: 20 })
    .withMessage("Mật khẩu phải từ 6 đến 20 ký tự")
    .trim()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]*$/)
    .withMessage(
      "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số, không chứa ký tự đặc biệt"
    )
    .matches(/^\S*$/)
    .withMessage("Mật khẩu không được chưa khoảng trắng"),
];

const loginValidationRule = () => [
  body("email")
    .notEmpty()
    .withMessage("Email không được để trống")
    .isEmail()
    .withMessage("Email không đúng định dạng")
    .trim()
    .matches(/^\S*$/)
    .withMessage("Email không được chưa khoảng trắng"),

  body("password")
    .notEmpty()
    .withMessage("Mật khẩu không được để trống")
    .isLength({ min: 6, max: 20 })
    .withMessage("Mật khẩu phải từ 6 đến 20 ký tự")
    .trim()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]*$/)
    .withMessage(
      "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số, không chứa ký tự đặc biệt"
    )
    .matches(/^\S*$/)
    .withMessage("Mật khẩu không được chưa khoảng trắng"),
];

const emailValidationRule = () => [
  body("email")
    .notEmpty()
    .withMessage("Email không được để trống")
    .isEmail()
    .withMessage("Email không đúng định dạng")
    .trim()
    .matches(/^\S*$/)
    .withMessage("Email không được chưa khoảng trắng"),
];

const passwordValidationRule = () => [
  body("newPassword")
    .notEmpty()
    .withMessage("Mật khẩu không được để trống")
    .isLength({ min: 6, max: 20 })
    .withMessage("Mật khẩu phải từ 6 đến 20 ký tự")
    .trim()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]*$/)
    .withMessage(
      "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số, không chứa ký tự đặc biệt"
    )
    .matches(/^\S*$/)
    .withMessage("Mật khẩu không được chưa khoảng trắng"),
];
module.exports = {
  registerValidationRule,
  loginValidationRule,
  emailValidationRule,
  passwordValidationRule
};