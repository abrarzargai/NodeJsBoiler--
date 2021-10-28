const express = require('express');
const route = express.Router();
const UserServices = require('../../Services/userService')
const middleware = require('../../utils/Middleware_validation')
/***************Routes************/

//SignUp
route.post('/signup',
           middleware.SignupValidation,middleware.validationFunction,
           UserServices.SignUp);

//Login
route.post('/login',UserServices.Login);

route.patch('/update', UserServices.Update);


module.exports = route;