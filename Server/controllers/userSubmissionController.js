const {
  UserSubmission,
  Answer,
  UserSubmissionAnswer,
  Question,
  Quizze,
} = require("../models");

exports.submitQuizz = async (req, res, next) => {
  const { quizzeId, answers } = req.body;
  const userId = req.user.id;
  try {
    const quizze = await Quizze.findByPk(quizzeId, {
      include: [
        {
          model: Question,
          as: "questions",
          include: [
            {
              model: Answer,
              as: "answers",
            },
          ],
        },
      ],
    });
    let score = 0;
    let correctCount = 0;
    const detailResults = [];

    for (const userAnswer of answers) {
      const question = quizze.questions.find(
        (q) => q.id === userAnswer.questionId
      );
      if (!question) continue;

      const answer = question.answers.find((a) => a.id === userAnswer.answerId);
      const correctAnswer = question.answers.find((a) => a.isCorrect);

      const isCorrect = answer && answer.isCorrect;
      if (isCorrect) {
        score += question.questionScore || 0;
        correctCount += 1;
      }
      detailResults.push({
        questionId: question.id,
        questionText: question.questionText,
        userAnswerId: userAnswer.answerId,
        userAnswerText: answer ? answer.answerText : null,
        correctAnswerId: correctAnswer ? correctAnswer.id : null,
        correctAnswerText: correctAnswer ? correctAnswer.answerText : null,
        isCorrect,
        questionScore: question.questionScore || 0,
      });
    }
    const submission = await UserSubmission.create({
      userId,
      quizzeId,
      score,
      correctCount,
    });

    for (const userAnswer of answers) {
      const question = quizze.questions.find(
        (q) => q.id === userAnswer.questionId
      );
      const answer = question
        ? question.answers.find((a) => a.id === userAnswer.answerId)
        : null;
      const isCorrect = answer ? !!answer.isCorrect : false;
      await UserSubmissionAnswer.create({
        userSubmissionId: submission.id,
        questionId: userAnswer.questionId,
        answerId: userAnswer.answerId,
        isCorrect,
      });
    }
    res.status(200).json({
      message: "Quiz submitted",
      score,
      correctCount,
      totalQuestion: quizze.questions.length,
      detailResults,
    });
  } catch (error) {
    next(error);
  }
};
