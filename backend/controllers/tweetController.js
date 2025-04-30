import TweetModel from "../models/Tweet.model.js";
import UserModel from "../models/User.model.js";

const getAllTweets = async (req, res) => {
  try {
    const { limit, search } = req.query;
    let page = parseInt(req.query.page);
    if (!page) {
      page = 1;
    }
    const skip = (page - 1) * limit;
    const queries = {};
    if (search) {
      queries.content = { $regex: search, $options: "i" };
    }
    const query = TweetModel.find(queries)
      .populate("creator", "-password -__v")
      .sort({ createdAt: -1 });

    const cnt = await TweetModel.countDocuments();

    if (limit && limit !== "0") {
      const parsedLimit = parseInt(limit);
      query.limit(parsedLimit).skip(skip);
    }
    const allTweets = await query;

    if (allTweets.length === 0) {
      return res.status(200).json({
        message: "no tweets found",
        tweets: [],
      });
    }
    return res.status(200).json({
      success: true,
      tweets: allTweets,
      count: cnt,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "internal server error on getting all the tweets",
    });
  }
};

const getUserTweets = async (req, res) => {
  try {
    const userId = req.user._id;
    const userTweets = await UserModel.findById(userId)
      .populate("tweets")
      .sort({ createdAt: -1 });
    if (!userTweets) {
      return res.status(404).json({
        success: false,
        messgae: "no user found",
      });
    }
    if (userTweets.tweets.length === 0) {
      return res.status(200).json({
        message: "no tweest for this user",
        tweets: [],
      });
    }
    return res.status(200).json({
      success: true,
      tweets: userTweets.tweets,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      messgae: "error on getting user tweets (server error)",
    });
  }
};

const addTweet = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({
        message: "content cant be empty",
      });
    }

    //creating a new tweet
    const newTweet = new TweetModel({
      content,
      creator: req.user._id,
    });
    await newTweet.save();

    //adding refernce of tweet to user
    await UserModel.findByIdAndUpdate(
      req.user._id,
      { $push: { tweets: newTweet._id } },
      { new: true }
    );

    //sending response
    return res.status(201).json({
      message: "tweet added ",
      success: true,
      tweet: newTweet,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "internal server error on adding post",
    });
  }
};

const deleteTweet = async (req, res) => {
  try {
    const tweetId = req.params.id;

    //gettng current user data
    const userId = req.user._id;
    const currUser = await UserModel.findById(userId);
    if (!currUser) {
      return res.status(404).json({
        message: "user not found",
      });
    }
    //checking if tweet belongs to user or not
    const isTweetBelongsToUser = currUser.tweets.find((tweet) => {
      return tweet._id.toString() === tweetId;
    });
    if (!isTweetBelongsToUser) {
      return res.status(401).json({
        success: false,
        message: "you are not authorized to delete this tweet",
      });
    }
    //finding and deleting that tweet
    const tweet = await TweetModel.findByIdAndDelete(tweetId);
    if (!tweet) {
      return res.status(404).json({
        message: "tweet not found",
      });
    }

    //deleting the reference in the user model to
    await UserModel.findByIdAndUpdate(userId, {
      $pull: { tweets: tweetId },
    });

    //sending response
    return res.status(200).json({
      message: "tweet deleted",
      tweet,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "internal server error on adding post",
    });
  }
};

const editTweet = async (req, res) => {
  try {
    const { content } = req.body;
    const tweetId = req.params.id;
    if (!content) {
      return res.status(400).json({
        message: "cant make the tweet empty",
      });
    }
    //getting current user data
    const currUser = await UserModel.findById(req.user._id);
    if (!currUser) {
      return res.status(404).json({
        message: "user not found",
      });
    }
    // checking if tweet belongs to user or not
    const isTweetBelongsToUser = currUser.tweets.find((tweet) => {
      return tweet._id.toString() === tweetId;
    });
    if (!isTweetBelongsToUser) {
      return res.status(400).json({
        message: "your are not authorized to edit this tweet",
      });
    }

    //updating tweet
    const updatedTweet = await TweetModel.findByIdAndUpdate(
      tweetId,
      { content },
      { new: true }
    );

    //sendig response
    return res.status(200).json({
      success: true,
      message: "tweet updated",
      tweet: updatedTweet,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "internal server error while upadting changes to tweet",
    });
  }
};
export { addTweet, getAllTweets, getUserTweets, deleteTweet, editTweet };
