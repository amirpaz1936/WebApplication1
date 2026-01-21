import { Schema, model } from "mongoose";

const commentSchema = new Schema(
  {
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    comment: { type: String },
  },
  { collection: "Comments" },
);

const Comment = model("Comment", commentSchema);

export default Comment;
