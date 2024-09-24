import React, { useEffect, useState, useSyncExternalStore } from "react";
import { useNavigate } from "react-router-dom";

import { useCheckAuth } from "../../auth";
import {getAllTeams} from "../../apis/teamApi"
import {changeAdminPassword} from "../../apis/adminAPI"
import {createEvent, getAllEvents, deleteEvent} from "../../apis/eventAPI"

import Button1 from "../../components/button1";
import Button2 from "../../components/button2";
import Button3 from "../../components/button3";
import Input1 from "../../components/input1";

import keyIcon from "../../resources/key.png"
import dartsMark from "../../resources/darts.png"

import "./index.css"

const AdminPage = () =>{

    useCheckAuth();

    const navigate = useNavigate();

    // const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [reNewPassword, setReNewPassword] = useState("");

    const [teams, setTeams] = useState([]);
    const [events, setEvents] = useState([]);

    const [hemiTeam, setHemiTeam] = useState("");
    const [gastTeam, setGastTeam] = useState("");
    const [eventDate, setEventdate] = useState("");

    useEffect(()=>{
        const run = async() =>{
            let allTeams = await getAllTeams();
            let allEvents = await getAllEvents();
            setEvents(allEvents);
            setTeams(["",...allTeams]);
        }

        run();
    }, [])

    const logOut = () =>{
        localStorage.setItem("IsLogIn", "no");
        navigate("/");
    }

    const changePassword = () =>{
        if(newPassword !== reNewPassword) {
            alert("Password not matched!");
            return;
        }
        changeAdminPassword(newPassword);
        alert("Changed Successfully!");
    }

    const addEvent = () =>{
        setEvents([...events, {hemiteam:hemiTeam, gastteam:gastTeam,date:eventDate}]);
        createEvent(hemiTeam, gastTeam, eventDate);
        alert("Created Successfully!");
    }

    const remove = (key, id) =>{
        setEvents(events.filter((event, id)=>key!==id));
        deleteEvent(id);
    }

    return (
        <div className="admin-pag">
            <div className="header">
                <div className="admin-header-top">
                    <img src={dartsMark} alt="" />
                    <Button1 width={"79px"} handleClickEvent={logOut} text={"Log Out"} />
                </div>
                <div className="admin-main-content">
                    <div className="admin-main-content-left">
                        {/* <div style={{marginTop:"50px", marginBottom:"50px"}}>
                            <Input1 placholder={"currentPassword"} type={"password"} icon={keyIcon} width={"90%"} value={currentPassword} setValue={setCurrentPassword} />
                        </div> */}
                        <div style={{marginTop:"50px", marginBottom:"50px"}}>
                            <Input1 placholder={"new password"} type={"password"} icon={keyIcon} width={"90%"} value={newPassword} setValue={setNewPassword} />
                        </div>
                        <div style={{marginTop:"50px", marginBottom:"50px"}}>
                            <Input1 placholder={"confirm new password"} type={"password"} icon={keyIcon} width={"90%"} value={reNewPassword} setValue={setReNewPassword} />
                        </div>
                        <Button2 text={"Change Password"} handleClickEvent={()=>{changePassword()}}/>
                    </div>
                    <div className="admin-main-content-mid">
                        <div className="admin-main-content-mid-top">
                            <label htmlFor="hemiteam">HemiTeam: </label>
                            <select name="hemiteam" id="hemiteam" value={hemiTeam} onChange={(e)=>{setHemiTeam(e.target.value)}}>
                                {
                                    teams.map(team=><option key={team} value={team}>{team}</option>)
                                }
                            </select>
                            <label htmlFor="hemiteam">GastTeam: </label>
                            <select name="gastteam" id="gastteam" value={gastTeam} onChange={(e)=>{setGastTeam(e.target.value)}}>
                                {
                                    teams.map(team=><option key={team} value={team}>{team}</option>)
                                }
                            </select>
                            <label htmlFor="date">Date</label>
                            <input type="date" value={eventDate} onChange={(e)=>{setEventdate(e.target.value)}} />
                            <Button3 text={"Add+"} handleClickEvent={()=>{addEvent()}} />
                        </div>
                        <div className="admin-main-content-table">
                            <table id="customers">
                                <tr>
                                    <th>HemiTeam</th>
                                    <th>GastTeam</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                                {
                                    events.map((event, key)=>{
                                        return <tr key = {key}>
                                            <td>{event.hemiteam}</td>
                                            <td>{event.gastteam}</td>
                                            <td>{event.date}</td>
                                            <td><Button3 text={"Remove"} handleClickEvent={()=>{remove(key, event.id)}} /></td>
                                        </tr>
                                    })
                                }
                            </table>
                        </div>
                    </div>
                    <div className="admin-main-content-right">

                    </div>
                </div>
            {/* <div className="header-bottom">
                <Button2  text={"My Team"} handleClickEvent={()=>{navigate("/adminPage")}}/>
                <Button2  text={"Button1"} handleClickEvent={()=>{navigate("/myteam")}}/>
            </div> */}
            </div>
        </div>
    )
}

export default AdminPage