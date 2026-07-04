import React, { useState, useEffect} from "react";
import {LoaderCircleIcon, XIcon} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  PlusIcon,
  UploadCloudIcon,
  FilePenLineIcon,
  Trash2Icon,
  PencilIcon,
} from "lucide-react";
import { dummyResumeData } from "../assets/assets";
import api from "../config/api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import pdftoText from 'react-pdftotext'

const Dashboard = () => {
  const {user,token}=useSelector(state=>state.auth);

  const [allresume, setallresume] = useState([]);
  const [showcreateresume,setshowcreateresume]=useState(false);
  const [showuploadresume,setshowuploadresume]=useState(false);
  const [title,settitle]=useState('');
  const [resume,setresume]=useState(null);
  const [editresumeid,seteditresumeid]=useState(null);
  const [isloading,setisloading]=useState(false);

  const edittitle=async(e)=>{
    console.log("fefe");
    try{
      e.preventDefault();

      const {data}=await api.put(`/api/resumes/update`,{resumeid:editresumeid,resumedata:{title}},{headers:{Authorization:token}});
      console.log(title);
      setallresume(prev=>prev.map((resume)=>resume._id===editresumeid ?{...resume,title}:resume)) ;  
      settitle('');
      seteditresumeid('');
      toast.success(data.message);
    }
    catch(error){
         toast.error(error?.response?.data?.message || error.message)
    }

  }
  const loadallresumes=async()=>{
    try{
      let {data}=await api(`/api/users/resumes`,{headers:{Authorization:token}})
      
      setallresume(data.userresumes || [])
      console.log(data.userresumes);
    }
    catch(error){
      toast.error(error?.response?.data?.message || error.message)
    }
  }
  const deleteresume=async(resumeid)=>{
    try{
      const confirm=window.confirm("Are you sure you want to delete this resume?");
      if (confirm){
        // 
        const {data}=await api.delete(`api/resumes/delete/${resumeid}`,{headers:{Authorization:token}})
        console.log("deleted resume id",data);
        //
        setallresume(prev=>prev.filter(resume=>resume._id!==data.id));
        toast.success(data.message)
      }
    }
    catch(error){
        toast.error(error?.response?.data?.message || error.message)
    }
  }

  useEffect(() => {
    loadallresumes()
  }, []);
 const navigate=useNavigate();

  const uploadresume=async(event)=>{
    console.log("upload resume button called");
    event.preventDefault();
    setisloading(true);
    try{
      const resumetext=await pdftoText(resume);
      const {data}=await api.post('/api/ai/upload-resume',{title,resumetext},{headers:{Authorization:token}})
      console.log({"i am getting the data":data});
      settitle('')
      setresume(null);
      setshowuploadresume(false);
      console.log("data from upload resume",data);
      navigate(`/app/builder/${data.resumeid}`);
    }
    catch(error){
      console.log("error in upload resume",error);
      toast.error(error?.response?.data?.message || error.message)
    }
    
    setisloading(false);
  }


  const colors = [
    "border-red-500",
    "border-orange-500",
    "border-yellow-500",
    "border-lime-500",
    "border-green-500",
    "border-cyan-500",
    "border-blue-500",
    "border-indigo-500",
    "border-purple-500",
    "border-pink-500",
  ];
  const createresume=async(event)=>{
    try{
      event.preventDefault()
      const {data}=await api.post(`/api/resumes/create`,{title},{headers:{Authorization:token}})
      setallresume([...allresume,data.resume]);
      settitle('');
      setshowcreateresume(false);
      navigate(`/app/builder/${data.resume._id}`);
    }
    catch(err){
      toast.error(err.response?.data?.message  || error.message)
    }

  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">
          Welcome, Joe Doe 👋
        </h1>

        {/* Action Cards */}
        <div className="flex flex-wrap gap-6 mb-10">
          {/* Create Resume */}
          <button onClick={()=>setshowcreateresume(true)}
            className="
              w-56 h-56
              bg-zinc-900
              rounded-2xl
              border border-zinc-700
              flex flex-col items-center justify-center
              gap-4
              shadow-xl
              hover:-translate-y-2
              hover:shadow-indigo-500/30
              hover:shadow-2xl
              transition-all duration-300
              group
            "
          >
            <PlusIcon
              className="
                w-14 h-14 p-3
                rounded-full
                bg-gradient-to-br
                from-indigo-400
                to-indigo-600
                text-white
                group-hover:scale-110
                transition-all duration-300
              "
            />

            <p className="text-lg font-semibold">
              Create Resume
            </p>
          </button>

          {/* Upload Resume */}
          <button 
          onClick={()=>setshowuploadresume(true)}
            className="
              w-56 h-56
              bg-zinc-900
              rounded-2xl
              border border-zinc-700
              flex flex-col items-center justify-center
              gap-4
              shadow-xl
              hover:-translate-y-2
              hover:shadow-purple-500/30
              hover:shadow-2xl
              transition-all duration-300
              group
            "
          >
            <UploadCloudIcon
              className="
                w-14 h-14 p-3
                rounded-full
                bg-gradient-to-br
                from-purple-400
                to-purple-600
                text-white
                group-hover:scale-110
                transition-all duration-300
              "
            />

            <p className="text-lg font-semibold">
              Upload Existing
            </p>
          </button>
        </div>

        {/* it gives us resume */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allresume.map((resume, index) => (
            <div  onClick={()=>{
              navigate(`/app/builder/${resume._id}`)
            }}
              key={index}
              className={`
                relative
                bg-zinc-900
                border-2
                ${colors[index % colors.length]}
                rounded-2xl
                p-5
                h-56
                shadow-lg
                hover:-translate-y-2
                hover:shadow-2xl
                transition-all duration-300
                group
              `}
            >
              {/* Top Section */}
              <div className="flex justify-between items-start">
                <FilePenLineIcon className="w-8 h-8 text-white" />

                <div className="hidden group-hover:flex gap-2">
                  <button>
                    <PencilIcon onClick={(e)=>{
                      e.stopPropagation();
                      
                      seteditresumeid(resume._id);settitle(resume.title);}} className="w-5 h-5 text-blue-400 hover:scale-110 transition" />
                  </button>

                  <button>
                    <Trash2Icon onClick={(e)=>
                     {e.stopPropagation();
                      deleteresume(resume._id)}} className="w-5 h-5 text-red-400 hover:scale-110 transition" />
                  </button>
                </div>
              </div>

              {/* Resume Info */}
              <div className="mt-6">
                <h2 className="text-lg font-semibold">
                  {resume.title || "My Resume"}
                </h2>

                <p className="text-slate-400 text-sm mt-2 line-clamp-3">
                  {resume.description ||
                    "Professional resume created with Resume Builder."}
                </p>
              </div>

              {/* Footer */}
              <div className="absolute bottom-4 left-5">
                <p className="text-xs text-slate-500">
                  Updated on{" "}
                  {resume.updatedAt
                    ? new Date(
                        resume.updatedAt
                      ).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div> 
          {showcreateresume && (
  <form
  onSubmit={createresume}
  onClick={()=>setshowcreateresume(false)}
  className="fixed inset-0 bg-black/70 backdrop-blur-sm z-10 flex items-center justify-center"
>
  <div
    onClick={(e) => e.stopPropagation()}
    className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6 text-gray-900"
  >
    <h2 className="text-xl font-bold mb-4 text-gray-900">
      Create a Resume
    </h2>

    <input
      type="text"
      placeholder="Enter resume title"
      onChange={(e) => settitle(e.target.value)}
      value={title}
      className="w-full border rounded px-4 py-2 mb-4 focus:border-green-600 focus:ring-green-600 text-gray-900"
      required
    />

    <p className="text-gray-600 text-sm mb-4">
      Start making your resume stand out with a catchy title that grabs attention!
    </p>

    <button
      type="submit"
      className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
    >
      Create Resume
    </button>

    <XIcon
      onClick={() => {
        setshowcreateresume(false);
        settitle("");
      }}
      className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
    />
  </div>
</form>
)}
{showuploadresume && (
    <form
  onSubmit={uploadresume}
  onClick={()=>setshowuploadresume(false)}
  className="fixed inset-0 bg-black/70 backdrop-blur-sm z-10 flex items-center justify-center"
>
  <div
    onClick={(e) => e.stopPropagation()}
    className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6 text-gray-900"
  >
    <h2 className="text-xl font-bold mb-4 text-gray-900">
      Upload Your Resume
    </h2>

    <input
    
      placeholder="Enter resume title"
      onChange={(e) => settitle(e.target.value)}
      value={title}
      className="w-full border rounded px-4 py-2 mb-4 focus:border-green-600 focus:ring-green-600 text-gray-900"
      required
    />

    <div>
      <label htmlFor="resume-input" className="block text-sm text-slate-700">
        Select your existing resume file 
        <div className='flex flex-col items-center justify-center gap-2
border group text-slate-aøø border-slate-400 border-dashed
rounded-md p-4 py-10 my-4 hover:border-green-500
hover:text-green-700 cursor-pointer transition-colors'>
          {resume ? (<p className="text-sm text-slate-600">{resume.name}</p>) : (
            <>
            <UploadCloudIcon className='size-14 stroke-1'/>
            <p> Upload Resume</p>
            </>
          )}
        </div>
      </label>
      <input type="file" id='resume-input' accept=".pdf" hidden onChange={(e)=>{setresume(e.target.files[0])}}/>
    </div>
          
    <button
      disbled={isloading}
      type="submit"
      className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
    >
      
          {isloading && <LoaderCircleIcon className='animate-spin size-4 text-white'/>}
          {isloading? "Uploading...":'Upload Resume'}
    </button>

    <XIcon
      onClick={() => {
        setshowuploadresume(false);
        settitle("");
      }}
      className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
    />
  </div>
</form>)}


    {editresumeid && (
  <form
  onSubmit={edittitle}
  onClick={()=>seteditresumeid('')}
  className="fixed inset-0 bg-black/70 backdrop-blur-sm z-10 flex items-center justify-center"
>
  <div
    onClick={(e) => e.stopPropagation()}
    className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6 text-gray-900"
  >
    <h2 className="text-xl font-bold mb-4 text-gray-900">
      Edit Resume Title
    </h2>

    <input
      type="text"
      placeholder="Enter resume title"
      onChange={(e) => settitle(e.target.value)}
      value={title}
      className="w-full border rounded px-4 py-2 mb-4 focus:border-green-600 focus:ring-green-600 text-gray-900"
      required
    />

    <p className="text-gray-600 text-sm mb-4">
      Start making your resume stand out with a catchy title that grabs attention!
    </p>

    <button
      type="submit"
      className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
    >
      Update
    </button>

    <XIcon
      onClick={() => {
        seteditresumeid('');
        settitle('');
      }}
      className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
    />
  </div>
</form>
)}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;