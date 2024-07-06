const express = require('express');
const {handleUsersignup, handleUserlogin} = require('../controllers/user')
const signupRouter = express.Router();

signupRouter.post('/', handleUsersignup);

signupRouter.post('/login', handleUserlogin);

module.exports = signupRouter;