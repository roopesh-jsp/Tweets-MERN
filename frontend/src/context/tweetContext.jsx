import { createContext, useContext } from "react";
import axios from "axios";
import { useAuth } from "./authContext";

const TweetContext = createContext({
  deleteTweet: () => {},
});

export const TweetProvider = ({ children }) => {
  const { getUser } = useAuth();
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
    } catch (error) {
      console.log(error);
    }
  }
  const ctxVal = {
    deleteTweet,
  };
  return (
    <TweetContext.Provider value={ctxVal}>{children}</TweetContext.Provider>
  );
};

export const useTweet = () => {
  return useContext(TweetContext);
};
