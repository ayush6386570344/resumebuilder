// import React from 'react'
// import {Lock, Mail, User2Icon} from "lucide-react";
// import api from '../config/api';
// import { useDispatch } from 'react-redux';
// import { login } from '../app/features/authslice';
// import toast from 'react-hot-toast';
// const   Login = () => {
//     console.log("i am in  login page");
//   const query=new URLSearchParams(window.location.search)
//   const urlState=query.get('state')
//   const [state, setState] = React.useState(urlState|| "login")
//     const [formData, setFormData] = React.useState({
//         name: '',
//         email: '',
//         password: ''
//     })
//     const dispatch=useDispatch();
//     const handleSubmit = async(e) => {
//         e.preventDefault()
//         try{
//             const {data}=await api.post(`/api/users/${state}`,formData)
//             dispatch(login(data));
//             localStorage.setItem('token',data.token);
//             toast.success(data.message)
//         }

//         catch(error){
            
//             toast(error?.response?.data?.message || error.message)
//         }
//     }
//     const handleChange = (e) => {
//         const { name, value } = e.target
//         setFormData(prev => ({ ...prev, [name]: value }))
//     }
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-900">
//        <form
//             onSubmit={handleSubmit}
//             className="sm:w-87.5 w-full text-center bg-gray-900 border border-gray-800 rounded-2xl px-8">
//             <h1 className="text-white text-3xl mt-10 font-medium">
//                 {state === "login" ? "Login" : "Sign up"}
//             </h1>

//             <p className="text-gray-400 text-sm mt-2">Please {state} in to continue</p>

//             {state !== "login" && (
//                 <div className="flex items-center mt-6 w-full bg-gray-800 border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2 ">
//                   <User2Icon size={16} color='687280'/>
//                     <input type="text" name="name" placeholder="Name" className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none " value={formData.name} onChange={handleChange} required />
//                 </div>
//             )}

//             <div className="flex items-center w-full mt-4 bg-gray-800 border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2 ">
//                 <Mail size={13} color='#6B7280'/>
//                 <input type="email" name="email" placeholder="Email id" className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none " value={formData.email} onChange={handleChange} required />
//             </div>

//             <div className=" flex items-center mt-4 w-full bg-gray-800 border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2 ">
//               <Lock size={13} color='#6B7280'/>
//                 <input type="password" name="password" placeholder="Password" className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none" value={formData.password} onChange={handleChange} required />
//             </div>

//             <div className="mt-4 text-left">
//                 <button className="text-sm text-indigo-400 hover:underline">
//                     Forget password?
//                 </button>
//             </div>

//             <button type="submit" className="mt-2 w-full h-11 rounded-full text-white bg-indigo-600 hover:bg-indigo-500 transition " >
//                 {state === "login" ? "Login" : "Sign up"}
//             </button>

//             <p onClick={() => setState(prev => prev === "login" ? "register" : "login") } className="text-gray-400 text-sm mt-3 mb-11 cursor-pointer" >
//                 {state === "login" ? "Don't have an account?" : "Already have an account?"}
//                 <span className="text-indigo-400 hover:underline ml-1">click here</span>
//             </p>
//         </form>
//     </div>
//   )
// }

// export default  Login


import React from 'react'
import { Lock, Mail, User2Icon, Eye, EyeOff } from "lucide-react";
import api from '../config/api';
import { useDispatch } from 'react-redux';
import { login } from '../app/features/authslice';
import toast from 'react-hot-toast';
const   Login = () => {
    console.log("i am in  login page");
  const query=new URLSearchParams(window.location.search)
  const urlState=query.get('state')
  const [state, setState] = React.useState(urlState|| "login")
  const [showPassword, setShowPassword] = React.useState(false);
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: ''
    })
    const dispatch=useDispatch();
    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const {data}=await api.post(`/api/users/${state}`,formData)
            dispatch(login(data));
            localStorage.setItem('token',data.token);
            toast.success(data.message)
        }

        catch(error){
            
            toast(error?.response?.data?.message || error.message)
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }
  return (
  <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-indigo-950 flex">

<div className="absolute top-20 left-20 h-72 w-72 bg-indigo-600 rounded-full blur-[160px] opacity-20"></div>

<div className="absolute bottom-20 right-20 h-96 w-96 bg-violet-600 rounded-full blur-[180px] opacity-20"></div>

<div className="absolute top-1/2 left-1/2 h-72 w-72 bg-blue-500 rounded-full blur-[150px] opacity-10"></div>

    {/* Left Section */}
    <div className="hidden lg:flex w-1/2 flex-col justify-center px-20 relative overflow-hidden">

      <div className="absolute w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl -top-20 -left-20"></div>
      <div className="absolute w-96 h-96 bg-violet-600/20 rounded-full blur-3xl bottom-0 right-0"></div>

     <div className="relative z-10">

  <div className="flex items-center gap-3 mb-6">
    <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 flex items-center justify-center text-2xl shadow-lg">
      🚀
    </div>

    <span className="text-2xl font-semibold text-gray-300">
      ResumeForge AI
    </span>
  </div>

  <h1 className="text-6xl font-extrabold leading-tight">
    Build Professional
    <br />

    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-500">
      Resumes with AI
    </span>
  </h1>

  <p className="mt-6 text-gray-300 text-lg leading-8 max-w-xl">
    ...
  </p>

  ...
</div>
    </div>

    {/* Right Section */}
    <div className="w-full lg:w-1/2 flex items-center justify-center p-6">

    <form
  onSubmit={handleSubmit}
  className="w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl px-8 py-10"
>
  <div className="text-center mb-8">

    <h2 className="text-4xl font-bold text-white">
      {state === "login" ? "Welcome Back 👋" : "Create Account 🚀"}
    </h2>

    <p className="text-gray-400 mt-3">
      {state === "login"
        ? "Login to continue building amazing resumes."
        : "Join ResumeForge AI and build your first resume."}
    </p>

  </div>

  {/* Name */}
  {state !== "login" && (
    <div className="flex items-center gap-3 mt-5 px-5 h-14 rounded-xl bg-black/30 border border-gray-700 focus-within:border-indigo-500 transition">
      <User2Icon size={20} className="text-gray-400" />

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full bg-transparent outline-none text-white placeholder:text-gray-500"
      />
    </div>
  )}

  {/* Email */}

  <div className="flex items-center gap-3 mt-5 px-5 h-14 rounded-xl bg-black/30 border border-gray-700 focus-within:border-indigo-500 transition">

    <Mail size={20} className="text-gray-400" />

    <input
      type="email"
      name="email"
      placeholder="Email Address"
      value={formData.email}
      onChange={handleChange}
      required
      className="w-full bg-transparent outline-none text-white placeholder:text-gray-500"
    />

  </div>

  {/* Password */}

 <div className="flex items-center gap-3 mt-5 px-5 h-14 rounded-xl bg-black/30 border border-gray-700 focus-within:border-indigo-500 transition">

  <Lock size={20} className="text-gray-400" />

  <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Password"
    value={formData.password}
    onChange={handleChange}
    required
    className="w-full bg-transparent outline-none text-white placeholder:text-gray-500"
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="text-gray-400 hover:text-white transition"
  >
    {showPassword ? (
      <EyeOff size={20} />
    ) : (
      <Eye size={20} />
    )}
  </button>

</div>

  {state === "login" && (
    <div className="text-right mt-3">

      <button
        type="button"
        className="text-sm text-indigo-400 hover:text-indigo-300 transition"
      >
        Forgot Password?
      </button>

    </div>
  )}

  <button
    type="submit"
    className="mt-8 w-full h-14 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/30 transition-all font-semibold text-lg"
  >
    {state === "login" ? "Login" : "Create Account"}
  </button>

  <div className="mt-8 text-center">

    <span className="text-gray-400">
      {state === "login"
        ? "Don't have an account?"
        : "Already have an account?"}
    </span>

    <button
      type="button"
      onClick={() =>
        setState((prev) =>
          prev === "login" ? "register" : "login"
        )
      }
      className="ml-2 text-indigo-400 hover:text-indigo-300 font-medium"
    >
      {state === "login" ? "Sign Up" : "Login"}
    </button>

  </div>
</form>

    </div>

  </div>
);
}

export default  Login
