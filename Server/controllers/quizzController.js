const { Quizze, Question, Answer} = require("../models");

exports.createQuiz = async (req, res, next) => {
  try {
    const newQuizze = await Quizze.create(req.body);
    res.status(201).json({ quizze: newQuizze });
  } catch (error) {
    next(error);
  }
};

exports.getQuizBySectionId = async (req, res, next) => {
  try {
    const quizzes = await Quizze.findAll({
      where: { sectionId:  req.params.id},
      include: [
        {
          model: Question,
          as: 'questions',
          include: [
            {
              model: Answer,
              as: 'answers'
            }
          ]
        }
      ]
    });
    if(quizzes.length === 0) {
        return res.status(404).json({ message: "Không có quizze nào trong chương này" });
    }
    res.status(200).json({ quizzes });
  } catch (error) {
    next(error);
  }
};
