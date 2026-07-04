import { Check, Palette } from 'lucide-react';
import React, { useState } from 'react'

const Colourpicker = ({selectedcolor,onChange}) => {
    const colors = [
  { name: "Blue", value: "#3B82F6" },
  { name: "Indigo", value: "#6366F1" },
  { name: "Purple", value: "#8B5CF6" },
  { name: "Green", value: "#10B981" },
  { name: "Red", value: "#EF4444" },
  { name: "Orange", value: "#F97316" },
  { name: "Teal", value: "#14B8A6" },
  { name: "Pink", value: "#EC4899" },
  { name: "Gray", value: "#687280" },
  { name: "Black", value: "#1F2937" }
];
const [isopen,setisopen]=useState(false);
  return (
    <div className='relative'>
      <button onClick={()=>setisopen(!isopen)}className='flex items-center gap 1 text-sm text-purple-300 hover:ring transition-all px-3 py-2 rounded-lg' >
        <Palette size={16} /> <span className='max-sm:hidden text-blue-600 '>Accent</span>
      </button>
      {isopen && (
        <div className='grid grid-cols-4 w-60 gap-2 absolute top-full left-0 right-0 p-3 mt-2 z-10 bg-white rounded-md border border-gray-200 shadow-sm' >
             {colors.map((color)=>(
                <div key={color.value} className='relative cursor-pointer group flex flex-col' 
                onClick={()=>{onChange(color.value);setisopen(false)}}>
                    <div className={`w-12 h-12 rounded-full border-2 border-transparent group-hover:border-black.34 transition-colors `} style={{backgroundColor:color.value}}></div>
                    {selectedcolor===color.value && (
                        <div> 
                         <Check className='size-5 text-white'/>
                        </div>
                    )}
                    <p className='text-xs text-center mt-1 text-gray-600'>{color.naame}</p>
                     </div>
             ))} </div>
      )}
    </div>
  )
}

export default Colourpicker
