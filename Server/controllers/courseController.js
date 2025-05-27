const { Course, Category, Level, Section, Review, User } = require("../models");
const { Op } = require("sequelize");
// exports.getAllCourses = async (req, res, next) => {
//   try {
//     const courses = await Course.findAll({
//       include: [
//         { model: Category, as: "category" },
//         { model: Level, as: "level" },
//       ],
//       where: {
//         title: { [Op.like]: `%${req.query.courseName}%` },
//       },
//     });
//     res.status(200).json(courses);
//   } catch (error) {
//     next(error);
//   }
// };
exports.getAllCourses = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 8
    } = req.query;
    const offset = (page - 1) * limit;
    const courseName = req.query.courseName || '';
    const whereCondition = courseName.trim()
      ? { title: { [Op.like]: `%${courseName}%` } }
      : {};

    const {rows: courses, count: totalCourses} = await Course.findAndCountAll({
      include: [
        { model: Category, as: "category" },
        { model: Level, as: "level" },
      ],
      limit: parseInt(limit) || 8,
      offset: parseInt(offset) || 0,
      where: whereCondition,
    });
    const totalPages = Math.ceil(totalCourses / limit);
    res.status(200).json({courses, totalPages, currentPage: parseInt(page), totalCourses});
  } catch (error) {
    next(error);
  }
};

exports.getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findByPk(req.params.id, {
      include: [
        {model: Section, as: "sections"},
        {model: Review, as: "reviews", include: [{model: User, as: "user" ,attributes: ["id", "username"]}]},
      ]
    });
    if (!course) {
      return res.status(404).json({ message: "Không tìm thấy khóa học" });
    }
    res.status(200).json({ course });
  } catch (error) {
    next(error);
  }
};

exports.createNewCourse = async (req, res, next) => {
  if (!req.file || !req.file.processedFileName) {
    return res
      .status(400)
      .json({ message: "Chưa upload ảnh ", status: "fail" });
  }
  try {
    const imagePath = `uploads/${req.file.processedFileName}`;
    const newCourse = await Course.create({
      ...req.body,
      image: imagePath,
    });
    res
      .status(201)
      .json({
        message: "Tạo khóa học thành công",
        course: newCourse,
        status: "success",
      });
  } catch (error) {
    next(error);
  }
};
