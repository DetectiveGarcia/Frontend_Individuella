import React from "react";
import { useUser } from "./UserContext";
import { Link } from "react-router-dom";

const NavBar = ({ isLoggedIn, setIsLoggedIn }) => {
  const { user } = useUser();
  function handleLogOut() {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    window.location.reload();
  }

  return (
    <nav>
      {isLoggedIn ? (
        <>
          <Link to="/create">Skapa blogg inlägg</Link>
          <p>Hej, {user.username && user.username}</p>
          <h1>BlogSpace</h1>
          <button
            onClick={() => {handleLogOut()}}
          >
            Logga ut
          </button>
        </>
      ) : (
        <>
          <Link to="/register">Skapa konto</Link>
          <h1>BlogSpace</h1>
          <Link to="/login">Logga in</Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;
