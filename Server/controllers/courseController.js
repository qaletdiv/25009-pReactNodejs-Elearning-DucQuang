const { Course } = require("../models");

exports.getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.findAll();
    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};

exports.getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findByPk(req.params.id);
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
        ...req.body, image: imagePath
    })
    res.status(201).json({message: "Tạo khóa học thành công", course: newCourse, status: "success"})
  } catch (error) {
    next(error)
  }
};
