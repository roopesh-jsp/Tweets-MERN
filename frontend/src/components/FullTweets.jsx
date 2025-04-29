import React, { useState } from "react";
import { FaDeleteLeft, FaPen } from "react-icons/fa6";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useAuth } from "../context/authContext";
import { useTweet } from "../context/tweetContext";
import DialogForm from "./DialogForm";

function FullTweets({ tweet }) {
  const { user } = useAuth();
  const { deleteTweet } = useTweet();
  console.log(user);
  const isCreator = user._id === tweet.creator._id;
  const [isUpdate, setIsUpdate] = useState(false);

  return (
    <div className="tweet_item">
      {isUpdate ? (
        <DialogForm
          closeModal={setIsUpdate}
          tweet={tweet}
          isUpdate={true}
        ></DialogForm>
      ) : (
        <></>
      )}
      <div className="content">{tweet.content}</div>
      <div className="divider"></div>
      <div className="tweet_actions">
        <div className="tweet_info">
          <span>{tweet.creator.name}</span>
          <span>{new Date(tweet.createdAt).toLocaleDateString()}</span>
        </div>
        {isCreator ? (
          <div className="cta">
            <button onClick={() => setIsUpdate(true)}>
              {" "}
              <FaPen />{" "}
            </button>
            <button onClick={() => deleteTweet(tweet._id)}>
              {" "}
              <MdOutlineDeleteOutline />{" "}
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default FullTweets;
