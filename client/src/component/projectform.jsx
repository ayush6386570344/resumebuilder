import { Plus, Trash2 } from 'lucide-react';
import React from 'react'

const Projectform = ({data,onchange}) => {
    const addproject=()=>{
        const newproject={
            name:"",
            type:"",
            description:"",
        }
        onchange([...data,newproject]);
    }
    const updateproject=(index,field,value)=>{
        const updatedproject=[...data];
        updatedproject[index]={...updatedproject[index],[field]:value};
        onchange(updatedproject);
    }
    const removeproject=(index)=>{
        const project=data.filter((_,i)=>i!=index);
        onchange(project);
    }
  return (
    <div className='space-y-6'>
        <div>
             <div className='flex items-center justify-between'>
    
        <div>
            <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Projects</h3>
            <p className='text-sm text-gray-500'>Add your Project detail</p>
        </div>

        <button onClick={addproject} className='flex item-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors'>
            <Plus className='size-4'/> Add Project
        </button>

      </div>
        </div>
            <div className='space-y-4 mt-6'>
                {data.map((project,index)=>(
                    <div key={index} className='p-4 border border-gray-200 rounded-lg space-y-3'>
                        <div className='flex justify-between items-start'>
                                <h4>Project #{index+1}</h4>
                                <button onClick={()=>removeproject(index)} className='text-red-500 hover:text-red-700 transition-colors'>
                                    <Trash2 className='size-4'/>
                                </button>
                        </div>
                        <div className='grid  gap-3'>
                            <input value={project.name || ""} onChange={(e)=>updateproject(index,"name",e.target.value)} type="text" placeholder='Project Name' name="" id="" className='px-3 py-2 text-sm rounded-lg border border-gray-400' />
                            {/* <input value={project.type || ""} onChange={(e)=>updateproject(index,"type",e.target.value)} type="text" placeholder='Project Type' name="" id="" className='px-3 py-2 text-sm rounded-lg border border-gray-400'/> */}
                           <textarea rows={4} value={project.description || ""} onChange={(e)=>updateproject(index,"description",e.target.value)} placeholder="Describe your project..." className="w-full px-3 py-2 text-sm rounded-lg resize-none  border border-gray-400"></textarea>
                        </div>                        
                    </div>
                ))} </div>
       

    </div>
  )
}

export default Projectform
