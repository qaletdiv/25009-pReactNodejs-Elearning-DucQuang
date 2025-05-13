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

exports.login = async(req, res, next) => {
  try {
    const {email , password} = req.body; 
    const user = await User.scope("withPassword").findOne({
      where: {email: email}
    });
    if(!user) {
      return res.status(401).json({message: 'Email hoặc mật khẩu không đúng'})
    }
    if(!password || !user.password) { 
      return res.status(400).json({message: "Dữ liệu không hợp lệ"})
    }
    const isMatch = await bcrypt.compare(password, user.password); 
    if(!isMatch) {
      return res.status(400).json({message: "Mật khẩu không đúng"});
    }
    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    })
    res.json({message: "Đăng nhập thành công", token: token, user: {id: user.id, email: user.email, role: user.role}})
  } catch (error) {
    next(error)
  }
}