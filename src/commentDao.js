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
