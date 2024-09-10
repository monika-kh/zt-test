import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register(){

    const [username, setusername] = useState(null);
    const [password, setpassword] = useState(null);

    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault()
        if(username && password){
            axios.post("http://localhost:8001/api/register/",{username,password}).then((res)=>{
                navigate('/login')
            }).catch((err)=>{
                console.log(err)
            })
        }else{
            alert("username and password required")
        }
    }

    return(
        <div className="mainLogin">
         <div className="background">
            <div className="shape"></div>
            <div className="shape"></div>
        </div>
        <form className="formLogin">
            <h3>Register</h3>

            <label className="labelLogin" for="username">Username</label>
            <input className="inptLogin" type="text" placeholder="Email or Phone" id="username" value={username} onChange={(e)=>setusername(e.target.value)}/>

            <label className="labelLogin" for="password">Password</label>
            <input className="inptLogin" type="password" placeholder="Password" id="password" value={password} onChange={(e)=>setpassword(e.target.value)}/>

            <button id="btnLogin" onClick={(e)=>handleRegister(e)}>Sign Up</button>
        </form>
    </div>
    )
}