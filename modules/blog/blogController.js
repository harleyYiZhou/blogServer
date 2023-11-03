// blogController.js

const Mock = require("mockjs");
const db = require("../../db");

// 模拟数据库中的博客数据
const blogs = [];

// 获取博客列表
exports.getBlogList = async (currentPage, pageSize) => {
  const collection = db.db.collection("blogs");

  // 模拟分页查询
  const skip = (currentPage - 1) * pageSize;

  // 获取分页数据
  const blogs = await collection.find({}).skip(skip).limit(pageSize).toArray();

  return blogs;
};

// 获取博客详情
exports.getBlogDetails = (req, res) => {
  const { blogId } = req.params;
  const blog = blogs.find((b) => b.id === parseInt(blogId));

  if (blog) {
    res.json(blog);
  } else {
    res.status(404).json({ message: "Blog not found" });
  }
};

// 发布博客
exports.publishBlog = async (blogData) => {
  const { title, author, content, tags } = blogData;
  const newBlog = {
    title,
    author,
    date: Mock.mock('@date("yyyy-MM-dd")'),
    content,
    tags,
  };
  const collection = db.db.collection("blogs"); // 替换为您的集合名称
  const result = await collection.insertOne(newBlog);
  return result;
};
