// userController.js

const Mock = require('mockjs');

// 模拟数据库中的用户数据
const users = [];

// 用户注册
exports.registerUser = (req, res) => {
  const { username, password, email } = req.body;

  // 检查是否已存在相同用户名或邮箱的用户，此处省略实现

  // 如果不存在，创建用户并返回数据
  const newUser = {
    id: users.length + 1,
    username,
    email,
  };
  users.push(newUser);

  res.json({ message: 'Registration successful', user: newUser });
};

// 用户登录
exports.loginUser = (req, res) => {
  const { username, password } = req.body;

  // 检查用户名和密码是否匹配，此处省略实现

  // 如果匹配，返回用户信息和身份验证token
  const user = users.find((u) => u.username === username);

  if (user) {
    // 模拟生成一个假的身份验证token
    const token = 'your_auth_token';
    res.json({ message: 'Login successful', user, token });
  } else {
    res.status(401).json({ message: 'Login failed' });
  }
};

// 获取用户信息
exports.getUserInfo = (req, res) => {
  // 检查身份验证token，此处省略实现

  // 如果token有效，返回用户信息
  // 假设身份验证token包含在请求头中的Authorization字段
  const token = req.header('Authorization');

  if (token === 'your_auth_token') {
    const user = users[0]; // 假设用户已登录
    res.json({ user });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
