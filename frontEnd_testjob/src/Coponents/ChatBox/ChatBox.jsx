import React, { useEffect, useState } from "react";
import "./Chatbox.css"
import axios from "axios";
import { SendOutlined } from "@ant-design/icons";

export default function ChatBox({ id, setmsgState }) {

    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [allMsgs, setallMsgs] = useState([]);

    const token = localStorage.getItem('token')
    const loginUserId = localStorage.getItem('loginUserId');

    const getAllMessages = () => {
        axios.get(`http://localhost:8001/api/ChatView/${id}`, { headers: { Authorization: `Token ${token}` } }).then((res) => {
            setallMsgs(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }


    useEffect(() => {

        const ws = new WebSocket(`ws://localhost:8001/ws/chat/general/${id}/`);

        ws.onopen = () => {
            console.log('WebSocket connected');
            setSocket(ws);
        };

        ws.onmessage = (event) => {
            console.log('Message from server ', event.data);
            setMessages(prevMessages => [...prevMessages, event.data]);
        };

        ws.onclose = () => {
            console.log('WebSocket disconnected');
        };

        return () => {
            ws.close();
        };
    }, []);

    const sendMessage = () => {
        if (socket) {
            const messageText = {
                message: message,
            }
            socket.send(JSON.stringify(messageText));
            setMessage('');
            getAllMessages()
        }
    };

    useEffect(() => {
        getAllMessages();
    }, [])


    return (
        <>
            <div class="inbox_msg">
                <div class="mesgs">
                    <div class="msg_history">
                        {
                            allMsgs.map((item) => {
                                return (
                                    <>
                                        {
                                            item.sender.id == loginUserId ?
                                                <div class="outgoing_msg">
                                                    <div class="sent_msg">
                                                        <p>{item.message}</p>
                                                        <span class="time_date"> 11:01 AM    |    June 9</span>
                                                    </div>
                                                </div>
                                                :
                                                <div class="incoming_msg">
                                                    <div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>

                                                    <div class="received_msg">
                                                        <div class="received_withd_msg">
                                                            <p>{item.message}</p>
                                                            <span class="time_date"> 11:01 AM    |    June 9</span>
                                                        </div>
                                                    </div>
                                                </div>
                                        }
                                    </>
                                )
                            })
                        }
                    </div>
                    <div class="type_msg">
                        <div class="input_msg_write">
                            <input type="text" class="write_msg" placeholder="Type a message" value={message} onChange={(e) => setMessage(e.target.value)} />
                            <button class="msg_send_btn" type="button" onClick={sendMessage}><SendOutlined /></button>
                        </div>
                    </div>
                </div>
            </div>
            <button style={{marginTop:"20px",padding:"5px 8px",borderRadius:"10px",background:"#05728f",color:"white",border:"none"}} type="button" onClick={()=>setmsgState(0)}>Go Back</button>
        </>
    )
}