import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import React from 'react'

const Education = ({data,onchange}) => {
    const addeducation=()=>{
      const neweducation={
        institution:"",
        degree:"",
        field:"",
        gpa:"",
        graduation_date:""
      };
      onchange([...data,neweducation]);
    }
    const removeeducation=(index)=>{
        const newdata=data.filter((_,i)=>i!==index);
        onchange(newdata);
    }
    const updateeducation=(index,field,value)=>{
        const updateddata=[...data];
        updateddata[index]={...updateddata[index],[field]:value};
        onchange(updateddata);
    }
  return (
     <div className='space-y-6'>
        <div>
             <div className='flex items-center justify-beteen'>
    
        <div>
            <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Education</h3>
            <p className='text-sm text-gray-500'>Add your education detail</p>
        </div>

        <button onClick={addeducation} className='flex item-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors'>
            <Plus className='size-4'/> Add Education
        </button>

      </div>
        </div>
        {data.length=== 0 ? (
            
            <div className='text-center py-8 text-gray-500'>
                <GraduationCap  className='w-12 h-12 mx-auto mb-3 text-gray-300'/>
                <p>No education details added yet.</p>
                <p className='text-sm'>Click "Add Education" to get started.</p>
            </div>
        ):(
            <div className='space-y-4'>
                {data.map((education,index)=>(
                    <div key={index} className='p-4 border border-gray-200 rounded-lg space-y-3'>
                        <div className='flex justify-between items-start'>
                                <h4>Education #{index+1}</h4>
                                <button onClick={()=>removeeducation(index)} className='text-red-500 hover:text-red-700 transition-colors'>
                                    <Trash2 className='size-4'/>
                                </button>
                        </div>
                        <div className='grid md:grid-cols-2 gap-3'>
                            <input value={education.institution || ""} onChange={(e)=>updateeducation(index,"institution",e.target.value)} type="text" placeholder='Institution Name' name="" id="" className='px-3 py-2 text-sm border border-gray-400'/>
                            <input value={education.degree || ""} onChange={(e)=>updateeducation(index,"degree",e.target.value)}  placeholder="Degree" type="text" name="" id=""className='px-3 py-2 text-sm border border-gray-400' />
                            <input value={education.field || ""} onChange={(e)=>updateeducation(index,"field",e.target.value)}  type="text" name="" id="" className='px-3 py-2 text-sm border border-gray-400' placeholder='Field of the study'/>
                            <input value={education.graduation_date || ""} onChange={(e)=>updateeducation(index,"graduation_date",e.target.value)} placeholder='Graduation Date' type="month" name="" id=""  className='px-3 py-2 text-sm border border-gray-400'/>
                        </div>
                            <input value={education.gpa || ""} onChange={(e)=>updateeducation(index,"gpa",e.target.value)} placeholder='gpa (optional)' type="text" name="" id="" className='px-3 py-2 text-sm border border-gray-400'/>
                        
                        
                    </div>
                ))} </div>
        )
        }

    </div>
  )
}

export default Education
