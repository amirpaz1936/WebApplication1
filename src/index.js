import { connect } from "mongoose";
import dotenv from "dotenv";
import express from "express";
import { insertNewPost, getAllPosts, getPostsBySender } from "./postDao.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connect(process.env.DB_URL)
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.post("/post/insert", insertNewPost);
app.get("/posts", getAllPosts);
app.get("/post", getPostsBySender);

app.listen(8000, () => {
  console.log(`Node server is running on port 8000`);
});
