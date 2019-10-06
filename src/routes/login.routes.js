const { Router } =require('express');
const loginController = require('../controller/login.controller')


const router = Router();

router
    .post('/login',loginController.login)
    .post('/google',loginController.loginGoogle)


module.exports = router;