import React, { useEffect, useState } from "react";
import "./User.css"
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

export default function UserList() {

    const [userListData, setuserListData] = useState([]);
    const token = localStorage.getItem("token")

    const getUserList = () => {
        axios.get("http://localhost:8001/api/allusers/", { headers: { Authorization: `Token ${token}` } })
            .then((res) => {
                setuserListData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const imgList = ['https://bootdey.com/img/Content/avatar/avatar7.png', 'https://bootdey.com/img/Content/avatar/avatar1.png', 'https://bootdey.com/img/Content/avatar/avatar2.png', 'https://bootdey.com/img/Content/avatar/avatar3.png', 'https://bootdey.com/img/Content/avatar/avatar4.png']

    const getRandomImage = (imgList) => {
        const randomIndex = Math.floor(Math.random() * imgList.length);
        return imgList[randomIndex];
    };

    const handleSentReq = (id) => {
        axios.post("http://127.0.0.1:8001/api/sentinterest/", { "to_request": id }, { headers: { Authorization: `token ${token}` } }).then((res) => {
            getUserList();
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        getUserList();
    }, [])

    return (
        <div className="mainUserList">
            <div class="container mt-3 mb-4 d-flex justify-content-center">
                <div class="col-lg-9 mt-4 mt-lg-0">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="user-dashboard-info-box table-responsive mb-0 bg-white p-4 shadow-sm">
                                <table class="table manage-candidates-top mb-0">
                                    <thead>
                                        <tr>
                                            <th>Candidate Name</th>
                                            <th class="action text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userListData.map((item, index) => {
                                            return (
                                                <tr class="candidates-list">
                                                    <td class="title">
                                                        <div class="thumb">
                                                            <img class="img-fluid" src={getRandomImage(imgList)} alt="" />
                                                        </div>
                                                        <div class="candidate-list-details">
                                                            <div class="candidate-list-info">
                                                                <div class="candidate-list-title">
                                                                    <h5 class="mb-0"><a href="#">{item.username}</a></h5>
                                                                </div>
                                                                <div class="candidate-list-option">
                                                                    <ul class="list-unstyled">
                                                                        <li><i class="fas fa-filter pr-1"></i>Information Technology</li>
                                                                        <li><i class="fas fa-map-marker-alt pr-1"></i>Rolling Meadows, IL 60008</li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex justify-content-center">
                                                            <PlusOutlined style={{ background: "#a9166e", color: "white", fontSize: "20px", padding: "5px 10px", borderRadius: "9px" }} onClick={() => handleSentReq(item.id)} />
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}