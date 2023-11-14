// userController.js

const Mock = require("mockjs");
const User = require("./userModel.js");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../../config/index.js");

// 模拟数据库中的用户数据

// 用户注册
exports.registerUser = async (req, res) => {
  const { username, password, nickname } = req.body;

  try {
    // 校验用户名是否已存在
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "用户名已存在" });
    }

    // 创建新用户
    const newUser = new User({ username, password, nickname });

    // 保存用户到数据库
    await newUser.save();

    res.json({ message: "注册成功", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "服务器错误" });
  }
};

// 用户登录
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "用户名或密码错误" });
    }

    // 验证密码
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: "用户名或密码错误" });
    }

    // 生成JWT令牌
    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "1h",
    });

    // 返回用户信息和令牌
    res.json({
      user: { username: user.username, nickname: user.nickname },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "服务器错误" });
  }
};

// 获取用户信息
exports.getUserInfo = (req, res) => {
  // 检查身份验证token，此处省略实现

  // 如果token有效，返回用户信息
  // 假设身份验证token包含在请求头中的Authorization字段
  const token = req.header("Authorization");

  if (token === "your_auth_token") {
    const user = users[0]; // 假设用户已登录
    res.json({ user });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
