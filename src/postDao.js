import Post from "./postModel.js";

export const insertNewPost = async (req, res) => {
  try {
    const post = Post({ message: req.body.message });
    const resultFromDB = await post.save();
    res.status(201).json(resultFromDB);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(HTTP).json({ message: error.message });
  }
};