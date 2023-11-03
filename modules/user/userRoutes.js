// userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('./userController');

// 用户注册
router.post('/register', userController.registerUser);

// 用户登录
router.post('/login', userController.loginUser);

// 获取用户信息
router.get('/profile', userController.getUserInfo);

module.exports = router;
