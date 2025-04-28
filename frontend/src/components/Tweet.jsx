import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import DialogForm from "./DialogForm";
import { useTweet } from "../context/tweetContext";

function Tweet({ tweet }) {
  const [showFrom, setShowForm] = useState(false);
  const { deleteTweet } = useTweet();

  return (
    <div className="profile_tweet_item">
      {showFrom ? (
        <DialogForm closeModal={setShowForm} tweet={tweet} isUpdate={true} />
      ) : (
        <></>
      )}
      <div className="content">{tweet.content}</div>
      <div className="divider"></div>
      <div className="cta">
        <button onClick={() => setShowForm(true)}>
          <FiEdit2 />
        </button>
        <button onClick={() => deleteTweet(tweet._id)}>
          <MdOutlineDeleteOutline />
        </button>
      </div>
    </div>
  );
}

export default Tweet;
