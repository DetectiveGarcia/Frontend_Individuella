import React, { useState } from "react";
import { useUser } from "../Components/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CreatePost = ({ baseURL }) => {
  const [createPost, setCreatePost] = useState({
    title: "",
    textContent: "",
    author: ""
  });

  const navigate = useNavigate()
  const { user } = useUser();
  const { isLoggedIn, setIsLoggedIn } = useUser();

  const createPostBtn = async (e) => {
    e.preventDefault();
    if(isLoggedIn === false){
      alert('Du måste logga in för att skapa ett inlägg');
      navigate('/login')
      return;
    }
    try {
      const response = await axios.post(
        baseURL + "/posts/create",
        JSON.stringify({ ...createPost, author: user.username }),
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        console.log("Post created");
        console.log(response);
      }
      window.location.reload();
      navigate('/')
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <>  
      <Link to={'/'}>Hem</Link>
      <div className="createPostPage">
        <h1 className="createPostTitle">Skapa blogg inlägg</h1>
        <div className="createPostForm">
          <form action="">
            <div className="inputs">
              <label htmlFor="postTitle">Titel</label>
              <input
                type="text"
                id="postTitle"
                onChange={(e) => {
                  setCreatePost({ ...createPost, title: e.target.value });
                }}
              />

              <label htmlFor="content">Innehåll</label>
              <textarea
                type="text"
                name=""
                id="content"
                onChange={(e) => {
                  setCreatePost({ ...createPost, textContent: e.target.value });
                }}
              />
            </div>
          </form>
          <button onClick={createPostBtn}>Skapa</button>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
