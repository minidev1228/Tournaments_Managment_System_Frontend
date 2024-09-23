import React, { useState } from "react";

import Button2 from "../button2";

import "./index.css"

const AddMemberModal = ({ handleOkClick, closeModal, data}) =>{
    const [modalInfo, setModalTeamInfo] = useState(data);

    const update = () =>{
        handleOkClick(modalInfo);
        closeModal();
    }

    return (
        <div className="member-profile-modal">
            <div>
                <div>
                    <h3>FristName: </h3>
                    <input type="text" style={{marginLeft:"13px"}} value={modalInfo.firstName} onChange={(e)=>{setModalTeamInfo({...modalInfo, firstName:e.target.value})}} />
                </div>
                <div>
                    <h3>LastName: </h3>
                    <input type="text" style={{marginLeft:"13px"}} value={modalInfo.lastName} onChange={(e)=>{setModalTeamInfo({...modalInfo, lastName:e.target.value})}} />
                </div>
                <div>
                    <h3>Street: </h3>
                    <input type="text" style={{marginLeft:"48px"}} value={modalInfo.street} onChange={(e)=>{setModalTeamInfo({...modalInfo, street:e.target.value})}} />
                </div>
                <div>
                    <h3>Number: </h3>
                    <input type="text" style={{marginLeft:"27px"}} value={modalInfo.number} onChange={(e)=>{setModalTeamInfo({...modalInfo, number:e.target.value})}} />
                </div>
            </div>
            <div>
                 <div>
                    <h3>Phone: </h3>
                    <input type="text" style={{marginLeft:"3px"}} value={modalInfo.phone} onChange={(e)=>{setModalTeamInfo({...modalInfo, phone:e.target.value})}} />
                </div>
                <div>
                    <h3>Email: </h3>
                    <input type="text" style={{marginLeft:"13px"}} value={modalInfo.email} onChange={(e)=>{setModalTeamInfo({...modalInfo, email:e.target.value})}} />
                </div>
                <div>
                    <h3>DOB: </h3>
                    <input type="date" style={{marginLeft:"24px"}} value={modalInfo.dob} onChange={(e)=>{setModalTeamInfo({...modalInfo, dob:e.target.value})}} />
                </div>
                <div className="team-profile-modal-button-group">
                    <Button2 text={"Update"} handleClickEvent={update} />
                    <Button2 text={"Close"} handleClickEvent={closeModal} />
                </div>
            </div>
        </div>
    )
}

export default AddMemberModal;