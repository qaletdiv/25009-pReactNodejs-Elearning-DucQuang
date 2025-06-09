const express = require('express');
const answerRouter = express.Router();
const answerController = require('../controllers/answerController');


answerRouter.post("/", answerController.createAnswer);
answerRouter.get("/:id", answerController.getAnswersByQuestionId);

module.exports = answerRouter;
