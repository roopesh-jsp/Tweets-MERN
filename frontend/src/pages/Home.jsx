import React from "react";
import { useTweet } from "../context/tweetContext";
import FullTweets from "../components/FullTweets";

function Home() {
  const { tweets } = useTweet();

  return (
    <div>
      {tweets.length <= 0 ? (
        <h3> no Tweets -_- !!</h3>
      ) : (
        <div className="tweets_container">
          {tweets.map((tweet) => (
            <FullTweets key={tweet._id} tweet={tweet} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
