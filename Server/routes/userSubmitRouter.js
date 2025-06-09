const express = require('express');
const userSubmit = express.Router();
const userSubmissionController = require('../controllers/userSubmissionController');
const authenticateToken = require('../middlewares/authenticateToken/authenticateToken')


userSubmit.post("/", authenticateToken, userSubmissionController.submitQuizz);

module.exports = userSubmit;