import React, { useEffect, useState } from "react";
import { useTweet } from "../context/tweetContext";
import FullTweets from "../components/FullTweets";

function Home() {
  const { tweets, count, getTweets } = useTweet();
  const [pg, setPg] = useState(1);
  const pages = Math.ceil(count / 4);
  const pgArray = new Array(pages).fill(0).map((_, i) => i + 1);

  useEffect(() => {
    getTweets(pg);
  }, [pg]);

  return (
    <div>
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
      <div className="home_cta">
        {pgArray.map((page) => {
          return (
            <button
              key={page}
              className={`pg_btn ${pg == page ? "active" : ""}`}
              onClick={() => setPg(page)}
            >
              {page}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
