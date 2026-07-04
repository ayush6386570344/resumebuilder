import React, {useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Layout from './pages/layout'
import Resumebuilder from './pages/resumebuilder'
import Preview from './pages/preview'
import Login from './pages/login'
import Dashboard from './pages/dashboard'
import { useDispatch } from 'react-redux'
import api from './config/api'
import {login,setLoading } from './app/features/authslice'
import {Toaster} from 'react-hot-toast'
const App = () => {
  const dispatch=useDispatch()
  // const getuserdata=async()=>{
  //   const token=localStorage.getItem('token')
  //   console.log("i am here",token);
  //   try{
  //     if (token){
  //       const {data}=await api.get('/api/users/data',{headers:{Authorization:token}});
  //       if (data.user){
  //         console.log("i am also coming here");
  //         dispatch(login({token,user:data.user}))
  //         dispatch(setLoading(false))
  //       }
  //     else{
  //         dispatch(setLoading(false));
  //       }
  //     }
  //   }
  //   catch(err){
  //     dispatch(setLoading(false));
  //     console.log("whola la")
  //     console.log(err.message);
  //   }
  // }

  const getuserdata = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    dispatch(setLoading(false));
    return;
  }

  try {
    const { data } = await api.get(
      '/api/users/data',
      {
        headers: {
          Authorization: token
        }
      }
    );

    if (data.user) {
      dispatch(login({ token, user: data.user }));
    }

    dispatch(setLoading(false));
  } catch (err) {
    dispatch(setLoading(false));
    console.log(err.message);
  }
};
  useEffect(()=>{
      getuserdata();
    },[])
  return (
    <>
    <Toaster/>
    <Routes>
    <Route path='/' element={<Home></Home>}/>
    <Route path='/app' element={<Layout></Layout>}>

    <Route index element={<Dashboard></Dashboard>}></Route>
    <Route path='builder/:resumeid' element={<Resumebuilder></Resumebuilder>}></Route>
    </Route>
    <Route path='view/:resumeid' element={<Preview></Preview>}> </Route>
    {/* <Route path='login' element={<Login></Login>}></Route> */}
    </Routes>
    </>
  )
}

export default App
