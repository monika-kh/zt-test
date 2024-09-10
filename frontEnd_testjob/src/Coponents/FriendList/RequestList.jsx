import React, { useEffect, useState } from "react";
import { CheckOutlined, CloseOutlined, } from "@ant-design/icons";
import axios from "axios";

export default function RequestList() {

    const [requestList, setrequestList] = useState([]);
    const token = localStorage.getItem("token");

    const getRequests = () => {
        axios.get("http://localhost:8001/api/pending_requests/", { headers: { Authorization: `token ${token}` } }).then((res) => {
            setrequestList(res.data == "User has no frind request" ? [] : res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    const imgList = ['https://bootdey.com/img/Content/avatar/avatar7.png', 'https://bootdey.com/img/Content/avatar/avatar1.png', 'https://bootdey.com/img/Content/avatar/avatar2.png', 'https://bootdey.com/img/Content/avatar/avatar3.png', 'https://bootdey.com/img/Content/avatar/avatar4.png']

    const getRandomImage = (imgList) => {
        const randomIndex = Math.floor(Math.random() * imgList.length);
        return imgList[randomIndex];
    };

    const handleReqAccept = (id) => {
        axios.post("http://localhost:8001/api/acceptinterest/", { "accept_request": id }, { headers: { Authorization: `token ${token}` } }).then((res) => {
            getRequests();
        }).catch((err) => {
            console.log(err);
        })
    }

    const handleReqreject = (id) => {
        axios.post("http://localhost:8001/api/rejectinterest/", { "reject_request": id }, { headers: { Authorization: `token ${token}` } }).then((res) => {
            getRequests();
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        getRequests();
    }, [])

    return (
        <>
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
                                            {requestList.length == 0 ? <tr style={{ textAlign: "center" }}>You don't have any Friends</tr> :

                                                requestList.map((item, index) => {
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
                                                                <div className="d-flex justify-content-around">
                                                                    <CheckOutlined style={{ color: "blue", fontSize: "30px", cursor: "pointer" }} onClick={() => { handleReqAccept(item.id) }} />
                                                                    <CloseOutlined style={{ fontSize: "30px", color: "#CA1D42", cursor: "pointer" }} onClick={() => handleReqreject(item.id)} />
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })

                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}