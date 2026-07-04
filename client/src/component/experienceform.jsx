import { Briefcase, Loader, Loader2, Plus, Sparkle, Trash } from 'lucide-react'
import React from 'react'
import { useState,} from 'react';
import api from '../config/api';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const Experienceform = ({data,onchange}) => {
const {token}=useSelector(state=>state.auth);
const [generatingindex,setgeneratingindex]=useState(-1);

    const addexperience=()=>{
        const newexperience={
            company: "",
            position: "",
            start_date:"",
            end_date:"",
            description:"",
            is_current:false

        };
        onchange([...data,newexperience])
    }
    const removeexperience=(index)=>{
        const updated=data.filter((_,i)=>i!==index);
        onchange(updated);
    }
    const updateexperience=(index,field,value)=>{
        const  updated=[...data];
        updated[index]={...updated[index],[field]:value}
        onchange(updated)
    }
    const generatedescription=async(index)=>{
        setgeneratingindex(index);
        const experience=data[index];
        const prompt=`enhance this job description ${experience.description} for the positino of ${experience.position} at ${experience.company}.` 
        try{
            const {data}=await api.post(`/api/ai/enhance-job-desc`,{usercontent:prompt},{headers:{Authorization:token}})
            console.log("enhanced job description",data);
            updateexperience(index,"description",data.enhancedcontent);
        }
       catch(error){
            if (error?.response?.status === 429) {
                toast.error("Too many requests. Please wait and try again.");
                return;
            }

            toast.error(error?.response?.data?.message || error.message);
        }
        finally{
            setgeneratingindex(-1);
        }
    }
  return (
    <div className='space-y-6'>
        <div>
             <div className='flex items-center justify-between'>
    
        <div>
            <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'> Professional Experience</h3>
            <p className='text-sm text-gray-500'>Add your job experience</p>
        </div>

        <button onClick={addexperience} className='flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors'>
            <Plus className='size-4'/> Add Experience
        </button>

      </div>
        </div>
        {data.length=== 0 ? (
            
            <div className='text-center py-8 text-gray-500'>
                <Briefcase className='w-12 h-12 mx-auto mb-3 text-gray-300'/>
                <p>No work experience added yet.</p>
                <p className='text-sm'>Click "Add experience" to get started.</p>
            </div>
        ):(
            <div className='space-y-4'>
                {data.map((experience,index)=>(
                    <div key={index} className='p-4 border border-gray-200 rounded-lg space-y-3'>
                        <div className='flex justify-between items-start'>
                                <h4>Experience #{index+1}</h4>
                                <button onClick={()=>removeexperience(index)} className='text-red-500 hover:text-red-700 transition-colors'>
                                    <Trash className='size-4'/>
                                </button>
                        </div>
                        <div className='grid md:grid-cols-2 gap-3'>
                            <input value={experience.company || ""} onChange={(e)=>updateexperience(index,"company",e.target.value)} type="text" placeholder='Company Name' name="" id="" className='px-3 py-2 text-sm rounded-lg border border-gray-300 w-full'/>
                            <input value={experience.position || ""} onChange={(e)=>updateexperience(index,"position",e.target.value)}  placeholder="Job Title" type="text" name="" id=""className='px-3 py-2 text-sm rounded-lg border border-gray-300 w-full' />
                            <input value={experience.start_date || ""} onChange={(e)=>updateexperience(index,"start_date",e.target.value)}  type="month" name="" id="" className='px-3 py-2 text-sm rounded-lg border border-gray-300 w-full'/>
                            <input value={experience.end_date || ""} onChange={(e)=>updateexperience(index,"end_date",e.target.value)}  disabled={experience.is_current} type="month" name="" id=""  className='px-3 py-2 text-sm rounded-lg border border-gray-300 w-full'/>
                        </div>
                        <label >
                            <input type="checkbox" checked={experience.is_current || false}
                            onChange={(e) => {
    const updated = [...data];

    updated[index] = {
        ...updated[index],
        is_current: e.target.checked,
        end_date: e.target.checked ? "" : updated[index].end_date
    };

    onchange(updated);
}} className='rounded border-gray-300 text-blue-600 focus:ring-blue-500' name="" id="" /> <span className='text-sm text-gray-700'>Currently working here</span>
                        </label>
                        <div className='space-y-2'>
                            <div className='flex items-center justify-between'>
                                <label>Job description</label>
                                <button onClick={()=>generatedescription(index)} disabled={generatingindex===index || !experience.position || !experience.company} className='flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50'>
                                    {generatingindex ===index ? (
                                        <Loader2 className='w-3 h-3 animate-spin'/>
                                    ):(
                                        <Sparkle className='w-3 h-3'/>
                                    )}
                                    {generatingindex===index ? "Generating" : "  Enhance with AI" }
                                  
                                </button>
                            </div>
                            <textarea   onChange={(e)=>{updateexperience(index,"description",e.target.value)}} value={experience.description || ""} rows={4} className='w-full text-sm px-3 py-2 rounded-lg resize-none' placeholder='Describe your key responsibilities and acheivements...'/>
                        </div>
                    </div>
                ))} </div>
        )
        }

    </div>
  )
}

export default Experienceform
