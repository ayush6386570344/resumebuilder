import { Loader2, Sparkle } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'
import api from '../config/api'
import toast from 'react-hot-toast'
import { useState } from 'react'

const Professionalsummary = ({data,onChange,setresumedata}) => {
  const {token}=useSelector(state=>state.auth)
  const [isgenerating,setisgenerating]=useState(false);
  const generatesummary=async()=>{
    try{
      setisgenerating(true);
      console.log("generating professional summary");
      const prompt=`enhance my professional summary "${data}"`;
      const response=await api.post(`/api/ai/enhance-pro-sum`,{usercontent:prompt},{headers:{Authorization:token}});
      console.log( "i am in professional summay",response);
      setresumedata(prev=>({...prev,professional_summary:response.data.enhancedcontent}));
    }
    catch(error){
      console.log("error in enhancing professional summary",error);
      toast.error(error?.response?.data?.message || error.message)
    }
    finally{
      setisgenerating(false);
    }
  }

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-beteen'>
    
        <div>
            <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'> Professional Summary</h3>
            <p className='text-sm text-gray-500'>Add summary for your resume here</p>
        </div>

        <button disabled={isgenerating} onClick={generatesummary}  className='flex item-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50'>
          {isgenerating ?  (<Loader2 className='size-4 animate-spin'/>):(
            <Sparkle className="size-4"/>
          )}
          {isgenerating ? "Enhancing": "AI Enhance"}

        </button>

      </div>

      <div className='mt-6'>
            <textarea value={data ||  ""} onChange={(e)=>onChange(e.target.value)} className='w-full p-3 px-4 mt-2 border text-sm border-gray-300
            rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline
            -none transition-colors resize-none' placeholder='Write a compelling professional summary that highlight your key strengths and career objective' name="" id=""/>
        <p className='text-xs text-gray-500 max-w-4/5 mx-auto text-center'>Tip: keep it concise and focus on your most relevent achievements and skills</p>
      </div>
    </div>
  )
}

export default Professionalsummary
