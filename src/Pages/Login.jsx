import React from "react";
import { useUser } from '../Components/UserContext.jsx'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Login = ({ baseURL }) => {
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { setUser  } = useUser();
  const { isLoggedIn, setIsLoggedIn } = useUser();
  // function loginUserBtn() {
  //   console.log(loginUser);
  // }

  const loginUserBtn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        baseURL + "/auth/login",
        JSON.stringify(loginUser),
        { headers: { "Content-type": "application/json" } }
      );
      console.log(response);

      if (response.status === 200) {
        setIsLoggedIn(true);
        localStorage.setItem('token', response.data.token)
        setUser(response.data.user)
      }
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="loginPage">
      <div className="loginForm">
        <h1 className="loginTitle">Logga in</h1>
        <form action="">
          <div className="inputs">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              id="email"
              onChange={(e) => {
                setLoginUser({ ...loginUser, email: e.target.value });
              }}
            />

            <label htmlFor="password">Lösenord: </label>
            <input
              type="text"
              name=""
              id=""
              onChange={(e) => {
                setLoginUser({ ...loginUser, password: e.target.value });
              }}
            />

            <button onClick={loginUserBtn}>Logga in</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
