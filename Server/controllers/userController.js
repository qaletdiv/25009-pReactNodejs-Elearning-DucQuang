const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");
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
    res.status(201).json({ message: "Tạo thành công", newUser: newUser });
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

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.scope("withPassword").findOne({
      where: { email: email },
    });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Email hoặc mật khẩu không đúng" });
    }
    if (!password || !user.password) {
      return res.status(400).json({ message: "Dữ liệu không hợp lệ" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mật khẩu không đúng" });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.json({
      message: "Đăng nhập thành công",
      token: token,
      user: { id: user.id, email: user.email, role: user.role },
    });
  } catch (error) {
    next(error);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const userEmail = await User.findOne({
      where: { email },
    });

    if (!email) {
      return res.status(400).json({ message: "Vui lòng nhập email" });
    }

    if (!userEmail) {
      return res.status(404).json({ message: "Email không tồn tại" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const transporter = nodeMailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.MY_GMAIL,
        pass: process.env.MY_GMAIL_PASSWORD,
      },
    });
    const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${token}`;
    const receiver = {
      from: "Elearning <no-reply@elearning.com>",
      to: email,
      subject: "Yêu cầu thay đổi mật khẩu",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #333; text-align: center;">Yêu cầu thay đổi mật khẩu</h2>
          <p style="color: #555; font-size: 16px;">
            Chào bạn,<br><br>
            Chúng tôi nhận được yêu cầu thay đổi mật khẩu cho tài khoản của bạn. Vui lòng nhấn vào nút bên dưới để tiến hành đặt lại mật khẩu:
          </p>
          <p style="color: #555; font-size: 14px;">
            Liên kết này sẽ hết hạn sau 1 giờ. Nếu bạn không yêu cầu thay đổi mật khẩu, vui lòng bỏ qua email này.
          </p>
           <div style="text-align: center; margin: 20px 0;">
            <a href="${resetLink}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-size: 16px;">
              Đặt lại mật khẩu
            </a>
          </div>
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
          <p style="color: #888; font-size: 12px; text-align: center;">
            © 2025 Elearning. All rights reserved.<br>
            Nếu bạn cần hỗ trợ, liên hệ chúng tôi tại <a href="mailto:support@elearning.com">support@elearning.com</a>.
          </p>
        </div>
      `,
    };
    await transporter.sendMail(receiver);
    return res.status(200).json({
      message: "Đường dẫn thay đổi mật khẩu đã được gửi thành công",
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    if (!newPassword) {
      return res.status(400).json({ message: "Yêu cầu nhập mật khẩu" });
    }
    if (!token) {
      return res.status(400).json({ message: "Yêu cầu xác thực token" });
    }

    let decodedPayload;
    try {
      decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(400).json({ message: "Token không hợp lệ hoặc đã hết hạn" });
    }

    const user = await User.findOne({
      where: { email: decodedPayload.email },
    });
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy email" });
    }
    const saltRound = 10;
    user.password = await bcrypt.hash(newPassword, saltRound);
    await user.save();
    res.status(200).json({ message: "Đổi mật khẩu thành công" });
  } catch (error) {
    next(error);
  }
};