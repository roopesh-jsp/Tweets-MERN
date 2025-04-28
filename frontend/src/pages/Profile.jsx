import React from "react";
import { useAuth } from "../context/authContext";
import Tweet from "../components/Tweet";
function Profile() {
  const { user } = useAuth();

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
            <Tweet tweet={tweet} key={tweet._id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
