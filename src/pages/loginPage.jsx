import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";


export default function LoginPage() {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const navigate = useNavigate();

  function login(){
    console.log(email, password)
    axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/login",{
      email:email,
      password:password
    }).then(
      (response)=>{
        console.log(response.data)

        localStorage.setItem("token",response.data.token)
        // const token = localStorage.getItem("token")

        toast.success("Login Successful")
        
        
        if(response.data.role==="admin"){
          // go to the admin page
          // window.location.href="/admin"
          navigate("/admin")
      }else if(response.data.role==="user"){
          // go to the user page
          // window.location.href="/"
          navigate("/")
      }
    }
    ).catch(
      (error)=>{
        console.log(error)
        toast.error("Login Failed")
      }
    )
  }
  return (
    <div className="w-full h-screen bg-[url(./loginbg.jpg)] bg-cover bg-center flex justify-center items-center">
      <div className="w-[500px] h-[500px] relative gap-[20px] backdrop-blur-sm shadow-2xl rounded-[30px] text-white flex flex-col items-center justify-center">
        <h1 className="text-5xl absolute top-[20px] font-bold text-center my-5 text-amber-50">Login</h1>
        <div className="w-[350px] flex flex-col items-start text-left">
          <span className="text-lg">Email</span>
        <input  onChange={
          (e) => {
            setEmail(e.target.value)
            console.log("email is changed")
          }
          } type="email" className="w-[350px] h-[40px] border border-white rounded-xl text-black outline-none focus:ring-2 focus:ring-white focus:bg-white"/>
        </div>
        <div className="w-[350px] flex flex-col items-start text-left">
          <span className="text-lg">Password</span>
        <input  onChange={
          (e) => {
            setPassword(e.target.value)
            console.log("password is changed")
          }
          } 
          type="password" className="w-[350px] h-[40px] border border-white rounded-xl text-black outline-none focus:ring-2 focus:ring-white focus:bg-white"/>
        </div>
        <button onClick={login} className="w-[350px] h-[40px] bg-blue-950 rounded-xl text-white text-lg mt-5 hover:bg-blue-700 transition-all duration-300">Login</button>

        <p>Don't have an account? <Link to="/register" className="text-blue-500 hover:text-blue-700">Sign Up </Link> </p>



      </div>
    </div>
  );
}
