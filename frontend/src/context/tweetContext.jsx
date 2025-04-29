import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./authContext";

const TweetContext = createContext({
  deleteTweet: () => {},
  tweets: [],
  getTweets: () => {},
  setTweets: () => {},
});

export const TweetProvider = ({ children }) => {
  const { getUser } = useAuth();

  const [tweets, setTweets] = useState([]);
  async function getTweets() {
    try {
      const { data } = await axios.get("http://localhost:3000/tweets/", {
        withCredentials: true,
      });
      // console.log(data);
      if (data?.success) {
        setTweets(data.tweets);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getTweets();
  }, []);
  async function deleteTweet(tweetId) {
    try {
      const { data } = await axios.delete(
        "http://localhost:3000/tweets/" + tweetId,
        {
          withCredentials: true,
        }
      );
      console.log(data);
      getUser();
      getTweets();
    } catch (error) {
      console.log(error);
    }
  }
  const ctxVal = {
    deleteTweet,
    tweets,
    getTweets,
    setTweets,
  };
  return (
    <TweetContext.Provider value={ctxVal}>{children}</TweetContext.Provider>
  );
};

export const useTweet = () => {
  return useContext(TweetContext);
};
