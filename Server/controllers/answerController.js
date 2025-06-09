const {Answer} = require('../models');

exports.createAnswer = async (req, res, next) => {
  try {
    const { questionId, answers } = req.body;

    const newAnswers = await Answer.bulkCreate(
      answers.map(ans => ({
        questionId,
        answerText: ans.answerText,
        isCorrect: ans.isCorrect
      }))
    );

    res.status(201).json({ answers: newAnswers });
  } catch (error) {
    next(error);
  }
};

exports.getAnswersByQuestionId = async (req, res, next) => {
  try {
    const answers = await Answer.findAll({
      where: { questionId: req.params.id },
    });

    if (answers.length === 0) {
      return res.status(404).json({ message: "Không có câu trả lời nào cho câu hỏi này" });
    }

    res.status(200).json({ answers });
  } catch (error) {
    next(error);
  }
};