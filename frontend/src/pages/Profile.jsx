import React from "react";
import { useAuth } from "../context/authContext";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useTweet } from "../context/tweetContext";
function Profile() {
  const { user } = useAuth();
  const { deleteTweet } = useTweet();
  console.log(user);

  return (
    <div className="profile">
      <div className="profile_head">
        <div className="profile_head_row">
          <div className="profile_head_title">Name</div>
          <div className="profile_head_colon">:</div>
          <div className="profile_head_value">{user?.name}</div>
        </div>
        <div className="profile_head_row">
          <div className="profile_head_title">Email</div>
          <div className="profile_head_colon">:</div>
          <div className="profile_head_value">{user?.email}</div>
        </div>
      </div>
      <hr />
      <div className="profile_tweets">
        <div className="profile_tweets_title">Tweets</div>
        <div className="profile_tweets_list">
          {user?.tweets?.map((tweet) => (
            <div key={tweet._id} className="profile_tweet_item">
              <div className="content">{tweet.content}</div>
              <div className="divider"></div>
              <div className="cta">
                <button>
                  <FiEdit2 />
                </button>
                <button onClick={() => deleteTweet(tweet._id)}>
                  <MdOutlineDeleteOutline />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
