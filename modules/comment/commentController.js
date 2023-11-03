// commentController.js

const Mock = require('mockjs');

// 模拟数据库中的评论数据
const comments = [];

// 评论博客
exports.commentBlog = (req, res) => {
  const { blogId } = req.params;
  const { comment } = req.body;

  // 检查博客是否存在，此处省略实现

  // 创建评论并返回数据
  const newComment = {
    id: comments.length + 1,
    blogId: parseInt(blogId),
    content: comment,
    date: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
  };
  comments.push(newComment);
  res.json({ message: 'Comment added', comment: newComment });
};
