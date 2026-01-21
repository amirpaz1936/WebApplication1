import Comment from "./commentModel.js";
import Post from "./postModel.js";

export const insertNewComment = async (req, res) => {
  try {
    const { postId } = req.body;
    const postToAddComment = await Post.findById(postId);

    if (!postToAddComment) {
      return res.status(404).json({ error: "Post not exist" });
    }

    const newComment = new Comment({
      postId: postId,
      comment: req.body.comment,
    });

    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getCommentsByPostId = async (req, res) => {
  try {
    const allComments = await Comment.find({ postId: req.params.post_id });
    res.json(allComments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const currDeletedComment = await Comment.findByIdAndDelete(req.params.id);
    if (!currDeletedComment)
      return res.status(404).json({ error: "Comment not found" });
    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};