import express from "express";
import { portectMiddleware } from "../middleware/protect.middlware.js";
import {
  addTweet,
  deleteTweet,
  editTweet,
  getAllTweets,
  getUserTweets,
} from "../controllers/tweetController.js";

const tweetRoutes = express.Router();

// adding a tweet
tweetRoutes.post("/", portectMiddleware, addTweet);

//getting all tweets use queries -> search,limit,page
tweetRoutes.get("/", getAllTweets);

//getting olnyy user tweets
tweetRoutes.get("/user", portectMiddleware, getUserTweets);

//updateing tweets
tweetRoutes.put("/:id", portectMiddleware, editTweet);

//deleitng tweets
tweetRoutes.delete("/:id", portectMiddleware, deleteTweet);

export default tweetRoutes;
