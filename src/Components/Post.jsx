import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useUser } from "./UserContext.jsx";
import CommentSection from "./CommentSection.jsx";

const Post = ({ post, baseURL }) => {
  const { user } = useUser();
  const [commentsFromDB, setCommentsFromDB] = useState(post.comments);
  const [text, setText] = useState("");
  const [author, setAuthor] = useState(user.username ? user.username : "Anonymous")
const handleComment = async (e) => {
    try {
      const response = await axios.post(`${baseURL}/comment/create/${post._id}`,
        JSON.stringify({text, author}),
        { headers: { "Content-type": "application/json" } }
      )
      if(response.data === 200){
        console.log("Comment created");
      }
    } catch (error) {
      console.log(error);
    }
    setText("");
    window.location.reload();
  }

  return (
    <>
      <div className="title">
        <h2>{post.title}</h2>
        {/* <p className="by">Av: {post.user.username}</p> */}
      </div>
      <p>{post.textContent}</p>
      <div className="commentArea">
        <input
          className="textarea"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          placeholder="Kommentera inlägg."
        />

        <button
          onClick={handleComment}
        >
          Skicka
        </button>
      </div>
      {commentsFromDB &&
        commentsFromDB.map((comment, index) => {
          return <CommentSection key={index} {...{ comment, baseURL }} />;
        })}
    </>
  );
};

export default Post;
