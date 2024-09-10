import React, { useState } from "react";
import "./Navbar.css"
import UserList from "../UserList/UserList";
import RequestList from "../FriendList/RequestList";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import AllFriendsList from "../AllFriends/AllFriendsList";

export default function Navbar(){

    const [active, setactive] = useState(1);
    const navigate = useNavigate();

    return(
        <>
            <div style={{background:"#4D0646",display:"flex",justifyContent:"end",padding:" 10px 20px"}}>
                <div style={{marginRight:"100px"}} >
                    <a className={active == 1 ? "active anchor" : "normalTab anchor"} onClick={()=>setactive(1)} style={{marginRight:"70px",fontSize:"20px",cursor:"pointer",}}>All Users</a>
                    <a className={active == 2 ? "active anchor" : "normalTab anchor"} onClick={()=>setactive(2)} style={{marginRight:"70px",fontSize:"20px",cursor:"pointer",}}>All Friend</a>
                    <a className={active == 0 ? "active anchor" : "normalTab anchor"} onClick={()=>setactive(0)} style={{fontSize:"20px",cursor:"pointer"}}>Incoming Request</a>
                    <LogoutOutlined onClick={()=>{localStorage.clear(); navigate('/login') }}  style={{marginLeft:"70px",color:"white",fontSize:"20px",fontWeight:"bold",cursor:"pointer"}} />
                </div>
            </div>
            {
                active == 1 ? <UserList/> : active == 2 ? <AllFriendsList/> :  <RequestList/>
            }
        </>
    )
}