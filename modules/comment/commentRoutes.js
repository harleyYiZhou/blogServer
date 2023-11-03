// commentRoutes.js

const express = require('express');
const router = express.Router();
const commentController = require('./commentController');

// 评论博客
router.post('/:blogId/comment', commentController.commentBlog);

module.exports = router;
