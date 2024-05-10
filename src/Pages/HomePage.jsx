import React from "react";
import NavBar from "../Components/NavBar.jsx";
import Post from "../Components/Post.jsx"
import { useUser } from "../Components/UserContext.jsx"

const HomePage = ({ postGallery, baseURL }) => {

  const { isLoggedIn, setIsLoggedIn } = useUser();

  return (
    <>
      <NavBar {...{ isLoggedIn, setIsLoggedIn }} />
      <main className="posts">
        {postGallery &&
          postGallery.map((post) => {
            return (
              <div className="post" key={post._id}>
                <Post {...{post, baseURL}} />
              </div>
            );
          })}
      </main>
    </>
  );
};

export default HomePage;
