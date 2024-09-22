import React, { useState } from "react";

import {updateTeamProfile} from "../../apis/teamApi"

import Button2 from "../button2";

import "./index.css"

const TeamProfileModal = ({name, league, region, link, setTeamInfo, closeModal}) =>{
    const [modalInfo, setModalTeamInfo] = useState({name, league, region, link})

    const update = () =>{
        setTeamInfo(modalInfo);
        updateTeamProfile(modalInfo);
        closeModal();
    }

    return (
        <div className="team-profile-modal">
            <div>
                <div>
                    <h3>Name: </h3>
                    <input type="text" style={{marginLeft:"13px"}} value={modalInfo.name} onChange={(e)=>{setModalTeamInfo({...modalInfo, name:e.target.value})}} />
                </div>
                <div>
                    <h3>League: </h3>
                    <select name="league" style={{marginLeft:"3px", width:"100%"}} value={modalInfo.league} onChange={(e)=>{setModalTeamInfo({...modalInfo, league:e.target.value})}}>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                    </select>
                </div>
                <div>
                    <h3>Region: </h3>
                    <input type="text" style={{marginLeft:"3px"}} value={modalInfo.region} onChange={(e)=>{setModalTeamInfo({...modalInfo, region:e.target.value})}} />
                </div>
                <div>
                    <h3>Link: </h3>
                    <input type="text" style={{marginLeft:"23px"}} value={modalInfo.link} onChange={(e)=>{setModalTeamInfo({...modalInfo, link:e.target.value})}}/>
                </div>
                <div className="team-profile-modal-button-group">
                    <Button2 text={"Update"} handleClickEvent={update} />
                    <Button2 text={"Close"} handleClickEvent={closeModal} />
                </div>
            </div>
        </div>
    )
}

export default TeamProfileModal;