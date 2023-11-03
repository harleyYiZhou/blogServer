// app.js

const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const db = require('./db');

app.use(express.json());
app.use(cors());

// 引入并使用用户模块路由
const userRoutes = require("./modules/user/userRoutes");
app.use("/api/user", userRoutes);

// 引入并使用博客模块路由
const blogRoutes = require("./modules/blog/blogRoutes");
app.use("/api/blogs", blogRoutes);

// 引入并使用评论模块路由
const commentRoutes = require("./modules/comment/commentRoutes");
app.use("/api/comments", commentRoutes);

db.connect();

app.listen(port, () => {
  console.log(`Mock server is running on port ${port}`);
});
