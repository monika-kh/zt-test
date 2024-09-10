import React, { useState } from "react";
import "./Login.css"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {

    const [userName, setuserName] = useState("");
    const [password, setpassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8001/api/login/",{"username":userName,"password":password}).then((res)=>{
            localStorage.setItem("token",res.data.token)
            localStorage.setItem("loginUserId",res.data.user_id)
            localStorage.setItem("loginUserName",res.data.username)
            navigate('/')
        }).catch((err)=>{
            if(err.status == 401){
                alert("Please Provide Valid Credentials")
            }
            console.log(err);
        })
    }
    
    return(
        <div className="mainLogin">
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <form className="formLogin">
                <h3>Login</h3>

                <label className="labelLogin" for="username">Username</label>
                <input className="inptLogin" type="text" placeholder="Email or Phone" id="username" value={userName} onChange={(e)=>setuserName(e.target.value)}/>

                <label className="labelLogin" for="password">Password</label>
                <input className="inptLogin" type="password" placeholder="Password" id="password" value={password} onChange={(e)=>setpassword(e.target.value)}/>

                <button id="btnLogin" onClick={(e)=>handleLogin(e)}>Log In</button>
                <p style={{marginTop:"10px",textAlign:"center"}}>Don't have an accout ? <Link to={'/register'} style={{color:"blue"}}>Sign Up</Link></p>
            </form>
        </div>
    )
}