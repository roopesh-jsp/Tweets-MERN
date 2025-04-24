import mongoose from "mongoose";

const TweetSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const TweetModel = mongoose.model("Tweet", TweetSchema);
export default TweetModel;
