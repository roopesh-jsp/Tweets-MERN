import React from "react";
import axios from "axios";
import { useAuth } from "../context/authContext";

function DialogForm({ closeModal, isUpdate, tweet = {} }) {
  const { getUser } = useAuth();
  console.log(tweet);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      const enteredData = Object.fromEntries(formData.entries());
      let dataa;
      if (isUpdate) {
        const { data } = await axios.put(
          "http://localhost:3000/tweets/" + tweet._id,
          enteredData,
          {
            withCredentials: true,
          }
        );
        dataa = data;
      } else {
        const { data } = await axios.post(
          "http://localhost:3000/tweets/",
          enteredData,
          {
            withCredentials: true,
          }
        );
        dataa = data;
      }
      console.log(dataa);
      if (dataa.success) {
        closeModal(false);
        getUser();
      }
    } catch (error) {
      console.log(error);
    }
  }
  function handelCloseByOverlay(e) {
    closeModal(false);
  }
  return (
    <div className="overlay" onClick={handelCloseByOverlay}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <div className="cta">
          <h3>Add Tweet</h3>
          <button onClick={() => closeModal(false)}>X</button>
        </div>
        <form onSubmit={handleSubmit}>
          <textarea
            type="text"
            name="content"
            placeholder="Type here"
            defaultValue={tweet?.content}
          />
          <button>ADD</button>
        </form>
      </div>
    </div>
  );
}

export default DialogForm;
