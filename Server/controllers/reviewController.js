const { Review, User} = require("../models");

exports.createReview = async (req, res, next) => {
  try {
    console.log(req.body);
    const newReview = await Review.create(req.body);
    res
      .status(201)
      .json({
        message: "Tạo bảng đăng ký thành công",
        review: newReview,
      });
  } catch (error) {
    next(error);
  }
};

exports.getReview= async (req, res, next) => {
  try {
    const reviews = await Review.findAll();
    res
      .status(200)
      .json({
        reviews: reviews,
      });
  } catch (error) {
    next(error);
  }
};

exports.getReviewById = async (req, res, next) => {
  try {
    const courseReview = await Review.findAll({
        where: {courseId: req.params.id},
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id","username"],
          },
        ],
    });
    console.log(courseReview);
    if (!courseReview) {
      return res.status(404).json({ message: "Không tìm thấy đánh giá" });
    }
    res.status(200).json({ courseReview });
  } catch (error) {
    next(error);
  }
}