const { User, Video, VideoCompleted } = require("../models");

exports.createVideoCompleted = async (req, res, next) => {
  try {
    console.log(req.body);
    const newVideoCompleted = await VideoCompleted.create(req.body);
    res.status(201).json({
      message: "Video completed created successfully",
      videoCompleted: newVideoCompleted,
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};

exports.getVideoCompleted = async (req, res, next) => {
  try {
    const videoCompleted = await VideoCompleted.findAll({
      where: {enrollmentId: req.params.id}
    });
    res.status(200).json({
      message: "Video completed retrieved successfully",
      videoCompleted,
      status: "success",
    });
  } catch (error) {
    next(error);
  }
}