// blogRoutes.js

const express = require("express");
const router = express.Router();
const blogController = require("./blogController");

// 获取博客列表
router.get("/", async (req, res) => {
  const { currentPage, pageSize } = req.query;
  const blogs = await blogController.getBlogList(
    parseInt(currentPage),
    parseInt(pageSize)
  );
  const response = {
    code: "000000",
    data: {
      currentPage: parseInt(currentPage),
      pageSize: parseInt(pageSize),
      list: blogs,
      total: blogs.length,
    },
  };
  res.json(response);
});

// 获取博客详情
router.get("/:blogId", blogController.getBlogDetails);

// 发布博客
router.post("/publish", async (req, res) => {
  const blogData = req.body;

  try {
    const newBlog = await blogController.publishBlog(blogData);
    res.json({
      code: "000000",
      msg: "success",
    });
  } catch (error) {
    console.error("Error inserting blog:", error);
    res.status(500).json({ error: "Failed to insert blog" });
  }
});

module.exports = router;
