const {Question} = require('../models');

exports.createQuestion = async (req, res, next) => {
    try {
        const newQuestion = await Question.create(req.body);
        res.status(201).json({ question: newQuestion });
    } catch (error) {
        next(error);
    }
}

exports.getQuestionsByQuizzeId = async (req, res, next) => {
    try {
        const quizzes = await Question.findAll({
            where: { quizzeId: req.params.id },
        });
        if (quizzes.length === 0) {
            return res.status(404).json({ message: "Không có câu hỏi nào trong quizze này" });
        }
        res.status(200).json({ questions: quizzes });
    } catch (error) {
        next(error);
    }
}