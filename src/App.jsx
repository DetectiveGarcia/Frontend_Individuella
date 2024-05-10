import './App.css'
import axios from 'axios'
import { UserProvider } from './Components/UserContext.jsx'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import HomePage from './Pages/HomePage.jsx'
import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx'
import CreatePost from './Pages/CreatePost.jsx'
import RegisterAdmin from './Pages/RegisterAdmin.jsx'



function App() {
  
  
  const [postGallery, setPostGallery] = useState([]);
  const baseURL = 'http://localhost:8080';



  useEffect(() => {
    
      const getData = async () => {
        
        try {
          const response = await axios.get(baseURL + '/posts');
          if(!response){
            res.status(404).json({ message: 'Axios response not found' })
          };

          if(response.data){
            setPostGallery(response.data.posts)
          };
        } catch (error) {
          console.log(error);
        }
      }
      getData();
  }, [])

  return (
    <>
      <UserProvider>
        <Routes>
          <Route path='/' element={<HomePage {...{ postGallery, baseURL }} />} />
          <Route path='/register' element={<Register {...{ baseURL }} />} />
          <Route path='/login' element={<Login {...{  baseURL }}/>} /> 
          <Route path='/create' element={<CreatePost {...{ baseURL }} />} />
          <Route path='/registeradmin' element={<RegisterAdmin {...{ baseURL }} />} />
        </Routes>
      </UserProvider>
    </>
  )
}

export default App
