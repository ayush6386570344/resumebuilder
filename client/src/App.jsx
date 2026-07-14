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
import Resumeanalysis from './pages/resumeanalysis'
import Analysisresult from './pages/analysisresult'
const App = () => {
  const dispatch=useDispatch()
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
    <Route path="resume-analysis" element={<Resumeanalysis />}/>
    <Route path="analysis-result" element={<Analysisresult />}/>
    </Route>
    <Route path='view/:resumeid' element={<Preview></Preview>}> </Route>
    </Routes>
    </>
  )
}

export default App
