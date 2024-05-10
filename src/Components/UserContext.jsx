import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext(null);
const baseURL = 'http://localhost:8080'

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    
    if(!token){
      setUser(false)
      setIsLoggedIn(false)
    }
    const getUserFromBD = async () => {
      const response = await axios.get(`${baseURL}/auth/user`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      console.log(response);
      setUser(response.data.user)
    }
    if(token){
      setIsLoggedIn(true);
      getUserFromBD()
    }

  }, [token])
  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
