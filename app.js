// app.js

const express = require("express");
const winston = require('winston');
const expressWinston = require('express-winston');
const app = express();
const cors = require("cors");
const port = 3000;
const db = require('./db');
const userRoutes = require("./modules/user/userRoutes");
const blogRoutes = require("./modules/blog/blogRoutes");
const commentRoutes = require("./modules/comment/commentRoutes");

app.use(express.json());
app.use(cors());

// 设置 winston 日志记录器
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

// 使用 express-winston 中间件记录 Express 请求日志
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'express.log' }),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
}));

// 引入并使用用户模块路由
app.use("/api/user", userRoutes);

// 引入并使用博客模块路由
app.use("/api/blogs", blogRoutes);

// 引入并使用评论模块路由
app.use("/api/comments", commentRoutes);

db.connect();

app.listen(port, () => {
  logger.info(`Server is running at http://localhost:${port}`);
});
