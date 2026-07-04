import React from 'react'
import ClassicTemplate from './templates/ClassicTemplate'
import MinimalImageTemplate from './templates/MinimalImageTemplate'
import MinimalTemplate from './templates/MinimalTemplate'
import ModernTemplate from './templates/ModernTemplate'
const Resumepreview = ({data,template,accentcolor,classes=""}) => {
    const rendertemplate=()=>{
        switch(template){
            case "modern":
                return <ModernTemplate data={data} accentColor={accentcolor}></ModernTemplate>
            case "minimal":
                return <MinimalTemplate  data={data} accentColor={accentcolor}></MinimalTemplate>
            case "minimal-image": 
                return <MinimalImageTemplate  data={data} accentColor={accentcolor}></MinimalImageTemplate>;
            default:
                return <ClassicTemplate  data={data} accentColor={accentcolor}></ClassicTemplate> 
        }
    }
  return (
    <div className='w-full bg-gray-100'>
        <div id="resume-preview" className={"border border-gray-200 print:shadow-none print:border-none"+classes}>
            {rendertemplate()}
        </div>
        <style jsx>
            {`
            @page{
            size:letter;
            margin:0;
            }
           @media print {
  body * {
    visibility: hidden;
  }

  #resume-preview,
  #resume-preview * {
    visibility: visible;
  }

  #resume-preview {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: auto;
  }
}
            `}



        </style>
    </div>
  )
}

export default Resumepreview
