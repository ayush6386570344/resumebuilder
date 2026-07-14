import React, { useEffect, useState } from 'react'
import { useParams} from 'react-router-dom'
import { dummyResumeData } from '../assets/assets'
import { ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, Download, DownloadIcon, EyeIcon, EyeOffIcon, FileText, FolderIcon, GraduationCap, Share, Share2Icon, Sparkle, Sparkles, User} from 'lucide-react'
import { Link } from 'react-router-dom'
import Personalinfo from '../component/personalinfo'
import Resumepreview from '../component/resumepreview'
import Templateselector from '../component/templateselector'
import Colourpicker from '../component/colourpicker'
import Professionalsummary from '../component/professionalsummary'
import Experienceform from '../component/experienceform'
import Education from '../component/education'
import Projectform from '../component/projectform'
import Skillsform from '../component/skillsform'
import { useSelector } from 'react-redux'
import api from '../config/api'
import toast from 'react-hot-toast'

const Resumebuilder = () => {
  console.log("hello j i am in resumebuilder")
  const {token}=useSelector(state=>state.auth);
  const {resumeid}=useParams()
  const [resumedata,setresumedata]=useState({
    _id:'',
    title:'',
    personal_info:{},
    professional_summary:"",
    experience:[],
    project:[],
    education:[],
    skills:[],
    template:"classic",
    accent_color:"#3B82F6",
    public:false,
  })
  const loadexistingresume=async ()=>{
    // const resume=dummyResumeData.find(resume=>resume._id===resumeid);
    const data=await api.get(`/api/resumes/get/${resumeid}`,{headers:{Authorization:token}});
    if (data.data.resumedata){
      setresumedata(data.data.resumedata);
      document.title=data.data.resumedata.title;
    }
    
  }
  const [activesectionindex,setactivesectionindex]=useState(0)
  const [removeBackground,setremoveBackground]=useState(false);
  const sections=[
    {id:"personal",name:"Personal info",icon:User},
    {id:"summary",name:"Summary",icon:FileText},
    {id:"experience",name:"Experience",icon:Briefcase},
    {id:"education",name:"Education",icon:GraduationCap},
    {id:"projects",name:"Projects",icon:FolderIcon},
    {id:"skills",name:"Skills",icon:Sparkles},
  ]
  const activesection=sections[activesectionindex]
  useEffect(()=>{
    loadexistingresume()
  },[])
 const changeresumevisibility = async () => {
  try {
    // 1. store previous value for rollback
    const prev = resumedata.public;

    // 2. optimistic update (instant UI change)
    setresumedata(prevState => ({
      ...prevState,
      public: !prevState.public
    }));

    const formdata = new FormData();
    formdata.append("resumeid", resumeid);
    formdata.append(
      "resumedata",
      JSON.stringify({ public: !prev })
    );

    const { data } = await api.put(
      `/api/resumes/update`,
      formdata,
      { headers: { Authorization: token } }
    );

    toast.success(data.message);

  } catch (err) {
    // rollback on error
    setresumedata(prev => ({
      ...prev,
      public: !prev.public
    }));

    console.error("error saving resumes:", err);
    toast.error(err?.response?.data?.message || err.message);
  }
}
  const handleshare=async()=>{
    const frontendurl=window.location.href.split('/app')[0];
    const resumeurl=frontendurl+'/view/'+resumeid;
    if (navigator.share){
      navigator.share({url:resumeurl,text:"My Resume",})
    }else{
      alert('Share not supported on this browser.')
    }
  }

  const downloadresume=()=>{
    console.log("Downloading resume...");
      window.print();
  }
  const saveresume=async()=>{
    try{
      console.log("i am in saveresume ",resumedata);
  
      let updatedresumedata=structuredClone(resumedata);
    
      //we wil send the image seperately 
      if (typeof resumedata.personal_info.image === 'object'){
        delete updatedresumedata.personal_info.image;
      }
      const formdata=new FormData();
      formdata.append("resumeid",resumeid);

      formdata.append("resumedata",JSON.stringify(updatedresumedata));
      removeBackground && formdata.append("removeBackground","yes")
      resumedata.personal_info.image instanceof File && formdata.append("image",resumedata.personal_info.image)

      const {data}=await api.put(`/api/resumes/update`,formdata,{headers:{Authorization:token}});
      console.log(data);
      setresumedata(data.resume);
      toast.success(data.message);
    }
    catch(err){
      console.error("Error saving resume",err);
    } 
  }
  return (
    <div>
  <div>
    <Link
      to="/app"
      className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all"
    >
      <ArrowLeftIcon className="size-4" />
      <span>Back to Dashboard</span>
    </Link>
  </div>

  <div className="max-w-7xl mx-auto px-4 pb-8">
    <div className="grid lg:grid-cols-12 gap-8">
      <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">
          
          {/* Progress bar using activeSectionIndex */}

          <hr className="absolute top-0 left-0 right-0 border-gray-200" />

          <hr
            className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-200"
            style={{ width: `${activesectionindex* 100 /(sections.length-1)}%`}}
          />

          {/* section navigation*/}
          <div className="flex justify-between items-center mb-6 border-b border-gray-200 py-1">
            <div className='flex items-center gap-2'>
                <Templateselector selectedTemplate={resumedata.template} onChange={(template)=>setresumedata(prev=>({...prev,template}))}></Templateselector>
                <Colourpicker selectedcolor={resumedata.accent_color}
                onChange={(color)=>{setresumedata(prev=>({...prev,accent_color:color}))}}></Colourpicker>
            </div>
            <div className='flex items-center'>
              {activesectionindex !==0 && (
                <button onClick={()=>setactivesectionindex((previndex)=>Math.max(previndex-1,0))} className='flex items-center gap-1  p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ' disabled={activesectionindex==0}>
                  <ChevronLeft className='size-4'></ChevronLeft>
                  Previous
                </button>
              )}
              <button onClick={()=>setactivesectionindex((previndex)=>Math.min(previndex+1,sections.length-1))} className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${activesectionindex===sections.length-1 && 'opacity-50'}`}
                disabled={activesectionindex===sections.length-1}>

                 Next <ChevronRight className='size-4'></ChevronRight>
                  
                </button>
            </div>
          </div>

          {/* form content */}
          <div className='space-y-6' >
            {activesection.id==="personal" && (
              <Personalinfo data={resumedata.personal_info} onchange={(data)=>setresumedata(prev=>({...prev,personal_info:data}))} removeBackground={removeBackground} setremoveBackground={setremoveBackground}/>)}
            {activesection.id==='summary' && (
              <Professionalsummary data={resumedata.professional_summary} onChange={(data)=>setresumedata(prev=>({...prev,professional_summary:data}))} setresumedata={setresumedata}/>
            )}
            {activesection.id==='experience' && (
              <Experienceform setresumedata={setresumedata} data={resumedata.experience} onchange={(data)=>{
              
                setresumedata(prev=>({...prev,experience:data}))}}/>
            )}
             {activesection.id === 'education' && (
              <Education setresumedata={setresumedata} data={resumedata.education} onchange={(data)=>{
                
                setresumedata(prev=>({...prev,education:data}))}}/>
            )}
            {activesection.id === 'projects' && (
              <Projectform setresumedata={setresumedata} data={resumedata.project} onchange={(data)=>{
                
                setresumedata(prev=>({...prev,project:data}))}}/>
            )}

            {activesection.id === 'skills' && (
              <Skillsform setresumedata={setresumedata} data={resumedata.skills} onchange={(data)=>{
                
                setresumedata(prev=>({...prev,skills:data}))}}/>
            )}

          </div>
          <button onClick={()=>{
          
           toast.promise(
  saveresume(),
  {
    loading: 'Saving...',
    success: 'Resume saved!',
    error: 'Failed to save resume'
  }
);
          }} className='bg-gradient-to-br from-green-100 to-green-200 ring-green-300
          text-green-600 ring hover:ring-green-400 transition-all rounded-md px-6 py-2 mt-6 text-sm'>
            Save Changes
          </button>
          
        </div>
      </div>
            
        {/* right panel */}
        <div className='lg:col-span-7 max-lg:mt-6'>
        

  {/* Buttons */}
  <div className='flex items-center justify-end gap-2 mb-4'>
    {resumedata.public && (
      <button onClick={handleshare} className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg ring-blue-300 hover:ring transition-colors'>
        <Share2Icon className='size-4' />Share
      </button>
    )}

    <button onClick={changeresumevisibility} className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600 ring-purple-300 rounded-lg hover:ring transition-colors'>
      {resumedata.public ? (
        <EyeIcon className='size-4' />
      ) : (
        <EyeOffIcon className='size-4' />
      )}
      {resumedata.public ? 'Public' : 'Private'}
    </button>

    <button onClick={downloadresume} className='flex items-center gap-2 px-6 py-2 text-xs bg-gradient-to-br from-green-100 to-green-200 text-green-600 rounded-lg ring-green-300 hover:ring transition-colors'>
      <DownloadIcon className='size-4' />
      Download
    </button>
  </div>

  {/* Resume Preview */}
  <Resumepreview
    data={resumedata}
    template={resumedata.template}
    accentcolor={resumedata.accent_color}
  />
</div>

    </div>
  </div>
</div>
  )
}

export default Resumebuilder
