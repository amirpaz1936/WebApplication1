import Post from "./postModel.js";

export const insertNewPost = async (req, res) => {
  try {
    const post = Post({
      message: req.body.message,
      senderId: req.body.senderId,
    });
    const resultFromDB = await post.save();
    res.status(201).json(resultFromDB);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.post_id, req.body, { new: true });

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getPostsBySender = async (req, res) => {
  try {
    const posts = await Post.find({ senderId: req.query.senderId });

    if (posts.length == 0) {
      return res
        .status(404)
        .json({ message: "this sender do not send any posts" });
    }

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
