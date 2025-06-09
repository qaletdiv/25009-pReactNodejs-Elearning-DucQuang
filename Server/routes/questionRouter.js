const express = require('express');
const questionRouter = express.Router();
const questionController = require('../controllers/questionController');


questionRouter.post("/", questionController.createQuestion);
questionRouter.get("/:id", questionController.getQuestionsByQuizzeId);

module.exports = questionRouter;