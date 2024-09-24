import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {getTeamData, addMember, updateMember, getAllMembers, removeMember} from "../../apis/teamApi"

import Layout from "../../layouts"
import Button2 from "../../components/button2";
import Button3 from "../../components/button3"
import TeamProfileModal from "../../components/teamProfileModal"
import AddMemberModal from "../../components/addMemberModal"

import "./index.css"

const MainPage = () =>{
    const navigate = useNavigate();

    const [teamInfo, setTeamInfo] = useState({name: "", league:"", region:"", link:""});
    const [members, setMembers] = useState([])
    const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
    const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
    const [currentId, setCurrentId] = useState(-1);
    
    useEffect(()=>{
        let isLogIn = localStorage.getItem("IsLogIn");
        if(isLogIn !== "yes"){
            navigate("/");
        }

        let run = async() =>{
            let data = await getTeamData();
            console.log(data);
            if(data.league === undefined) data.league = "A";
            setTeamInfo(data);    
            let members = await getAllMembers();
            setMembers(members);
        }

        run();

    }, [])

    const edit = (id) =>{
        setCurrentId(id);
        setIsAddMemberModalOpen(true);
    }

    const remove = (id) =>{
        setMembers(members.filter((member, key)=>key!==id));
        removeMember(id);
    }

    const generateLicenceNumber = () =>{
        let id = "";
        for(let i = 0; i<10;i++){
            let d = Math.floor(Math.random() * 10);;
            id = `${id}${d}`;
        }
        return id;
    }
    

    const update  = (data) =>{
        if(currentId === -1){
            data = {...data, license: generateLicenceNumber()};
            setMembers([...members, data]);
            addMember(data);
        }
        else{
            setMembers(members.map((member, key)=>{
                if(key === currentId) return data;
                return member;
            }))
            updateMember(currentId, data);
        }
    }

    const addNew = () =>{
        setCurrentId(-1);
        setIsAddMemberModalOpen(true);
    }


    return (
        <Layout>
            {
                isTeamModalOpen? <TeamProfileModal setTeamInfo={setTeamInfo} name={teamInfo.name} league={teamInfo.league} region={teamInfo.region} link={teamInfo.link} closeModal={()=>{setIsTeamModalOpen(false)}}/>:""
            }
            {
                isAddMemberModalOpen? <AddMemberModal handleOkClick={update} data={currentId === -1 ? {} : members[currentId] } closeModal={()=>{setIsAddMemberModalOpen(false)}}/>:""
            }
            <div className="main-page">
                <div className="main-page-left">
                    <div>
                        <h3>Name: </h3>
                        <p>{teamInfo.name}</p>
                    </div>
                    <div>
                        <h3>League: </h3>
                        <p>{teamInfo.league}</p>
                    </div>
                    <div>
                        <h3>Region: </h3>
                        <p>{teamInfo.region}</p>
                    </div>
                    <div style={{marginBottom:"5vh"}}>
                        <h3>Link: </h3>
                        <p>{teamInfo.link}</p>
                    </div>
                    <Button2 text={"Edit"} handleClickEvent={()=>{setIsTeamModalOpen(true)}} width="90%"/>
                </div> 
                <div className="main-page-right">
                    <div className="table-div">
                        <table id="customers">
                            <tr>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Street</th>
                                <th>Number</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>License Number</th>
                                <th>DOB</th>
                                <th>Action1</th>
                                <th>Action2</th>
                            </tr>
                            {
                                members.map((member, key)=>{
                                    return <tr key = {key}>
                                        <td>{member.firstName}</td>
                                        <td>{member.lastName}</td>
                                        <td>{member.street}</td>
                                        <td>{member.number}</td>
                                        <td>{member.phone}</td>
                                        <td>{member.email}</td>
                                        <td>{member.license}</td>
                                        <td>{member.dob}</td>
                                        <td><Button3 text={"Edit"} handleClickEvent={()=>{edit(key)}} /></td>
                                        <td><Button3 text={"Remove"} handleClickEvent={()=>{remove(key)}} /></td>
                                    </tr>
                                })
                            }
                            {/* <tr>
                                <td>Alfreds Futterkiste</td>
                                <td>Maria Anders</td>
                                <td>Germany</td>
                            </tr> */}
                        </table>
                    </div>
                    <div style={{display:"flex"}}>
                        <div style={{flexGrow:"1"}}></div>
                        <Button2 text={"Add Member +"} handleClickEvent={addNew}/>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default MainPage;