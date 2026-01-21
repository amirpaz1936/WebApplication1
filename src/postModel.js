import { Schema, model } from "mongoose";

const PostModel = new Schema(
  {
    message: { type: String },
  },
  { collection: "Posts" }
);

const Post = model("Post", PostModel);

export default Post;
