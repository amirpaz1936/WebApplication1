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

export const updateComment = async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      req.body,
      { new: true, runValidators: true },
    );

    if (!updatedComment) {
      return res.status(404).json({ error: "Comment not exist" });
    }

    res.json(updatedComment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
