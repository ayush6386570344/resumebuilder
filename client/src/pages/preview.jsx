import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { dummyResumeData } from '../assets/assets';
import Resumepreview from './../component/resumepreview'
import { ArrowLeftIcon, Loader, Loader2 } from 'lucide-react';
import api from '../config/api';
const Preview = () => {
  const {resumeid}=useParams();
  console.log(resumeid);
  const [resumedata,setresumedata]=useState(null);
  const [isloading,setisloading]=useState(true)
  const loadresume=async()=>{
    try{
      const {data}=await api.get(`/api/resumes/public/${resumeid}` )
      setresumedata(data.resume);
    }
    catch(error){
      console.log(error.message);
    }
    finally{
      setisloading(false);
    }
  }
  useEffect(()=>{
    loadresume()
  },[])
 
  return  resumedata ?(
    <div className='bg-slate-100'>
        <div className='max-w-3xl mx-auto py-10'>
          <Resumepreview classes='py-4 bg-white' data={resumedata} template={resumedata.template} accentcolor={resumedata.accent_color} ></Resumepreview>
        </div>
    </div>
  ):(
    <div>
      {isloading ? <Loader2 className='animate-spin'/>:
     <div className='flex flex-col items-center justify-center h-screen'>
      <p className='text-center text-6xl text-slate-400 font medium'>Resume not found</p>
      <a className='mt-6 bg-green-500 hover:bg-green-600 text-white rounded-full px-6 h-9 m-1 ring-offset-1 ring-1 ring-green-400 flex items-center transition-colors' href="/">
        <ArrowLeftIcon className='mr-2 size-4'/>go to home page
      </a>
     </div> }
    </div>
  )
}

export default Preview
