import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Link } from "react-router-dom";

const Register = ({ baseURL }) => {

  const [registerUser, setRegisterUser] = useState({
    username: "",
    email: "",
    password: ""
  })

  const navigate = useNavigate();

  // function registerUserBtn() {
  //   console.log(registerUser);
  // }
  
const registerUserBtn = async (e) => {
  e.preventDefault();
  try{
    const response = await axios.post(baseURL + '/auth/register', 
      JSON.stringify(registerUser), 
      { headers: { "Content-type": "application/json" } })

    if(response.status === 200){
      console.log('User created');
    }
    navigate("/login");
  }catch(error){
    console.log(error);
  }
}

  return (
    <>
      <div className="registerPage">
        <div className="registerForm">
          <h1 className="registerTitle">Skapa konto</h1>
          <form action="">
          <div className="inputs">
            <label htmlFor="username">Användarnamn: </label>
            <input type="text" id="username" onChange={(e) => {
              setRegisterUser({...registerUser, username: e.target.value})
            }} />

            <label htmlFor="email">Email: </label>
            <input type="email" id="email" onChange={(e) => {
              setRegisterUser({...registerUser, email: e.target.value})
            }} />

            <label htmlFor="password">Lösenord: </label>
            <input type="text" name="" id="password"  onChange={(e) => {
              setRegisterUser({...registerUser, password: e.target.value})
            }} />
            <button onClick={registerUserBtn}>Registrera dig</button>
          </div>
          </form>
          <p>Har du redan ett konto?</p> <Link to={'/login'}>Logga in</Link>
        </div>
      </div>
    </>
  );
};

export default Register;
