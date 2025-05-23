import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./authContext";

const TweetContext = createContext({
  deleteTweet: () => {},
  tweets: [],
  getTweets: () => {},
  setTweets: () => {},
  count: 0,
});

export const TweetProvider = ({ children }) => {
  const { getUser } = useAuth();
  const [count, setCount] = useState(0);

  const [tweets, setTweets] = useState([]);
  async function getTweets(pg) {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/tweets/" + `?page=${pg}&limit=4`,
        {
          withCredentials: true,
        }
      );
      // console.log(data);
      if (data?.success) {
        setTweets(data.tweets);
        setCount(data.count);
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
    count,
  };
  return (
    <TweetContext.Provider value={ctxVal}>{children}</TweetContext.Provider>
  );
};

export const useTweet = () => {
  return useContext(TweetContext);
};
