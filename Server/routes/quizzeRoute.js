const express = require('express');
const quizzeRouter = express.Router();
const quizzController = require('../controllers/quizzController');


quizzeRouter.post("/", quizzController.createQuiz);
quizzeRouter.get("/:id", quizzController.getQuizBySectionId);




module.exports = quizzeRouter;