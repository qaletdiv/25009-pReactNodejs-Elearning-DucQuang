const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.createUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const userRes = newUser.toJSON();
    res.status(201).json({ message: "Tạo thành công", newUser: newUser});
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      const field = error.errors[0].path;
      res.status(409).json({
        message: `Lỗi đăng ký`,
        errors: [{ msg: `${field} đã tồn tại.`, param: field }],
      });
      if (error.name === "SequelizeValidationError") {
        const messages = error.errors.map((err) => ({
          msg: err.message,
          param: err.path,
        }));
        return res
          .status(400)
          .json({ message: "Dữ liệu không hợp lệ", errors: messages });
      }
      next(error);
    }
  }
};
