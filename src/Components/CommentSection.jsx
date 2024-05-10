import React from "react";
import axios from 'axios'
import { useUser } from "./UserContext";

const CommentSection = ({ comment, baseURL }) => {

  const { user } = useUser();

  const deleteComment = async (e) => {
    try {
      const response = await axios.delete(`${baseURL}/comment/delete/${comment._id}`)
      if(response.status === 200){
        alert('Comment deleted')
        console.log('Comment succefully deleted');
        window.location.reload()
      }
    } catch (error) {
      console.log("Error deleting comment:", error);
    }
  }

  return (
    <>
      <div className="comment">
        <p className="commentName">{comment.author}</p>
        <p>{comment.text}</p>
        {user.isAdmin && <button onClick={deleteComment} >Ta bort</button>}
      </div>
    </>
  );
};

export default CommentSection;
