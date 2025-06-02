const { Video } = require("../models");

exports.createVideo = async (req, res, next) => {
  if (!req.file || !req.file.processedFileName) {
    return res
      .status(400)
      .json({ message: "Chưa upload video ", status: "fail" });
  }
  try {
    const videoPath = `uploads/${req.file.processedFileName}`;
    const newVideo = await Video.create({
        ...req.body,
        path: videoPath
    });
    res
      .status(201)
      .json({
        message: "Tạo video khóa học thành công",
        course: newVideo,
        status: "success",
      });
  } catch (error) {
    next(error)
  }
};
