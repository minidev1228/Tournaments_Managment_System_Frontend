import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {getTeamData} from "../../apis/teamApi"

import Layout from "../../layouts"
import Button2 from "../../components/button2";
import TeamProfileModal from "../../components/teamProfileModal"

import "./index.css"

const MainPage = () =>{

    const navigate = useNavigate();

    const [teamInfo, setTeamInfo] = useState({name: "bbb", league:"A", region:"aaa bbb cccc", link:"http://map.search.ch/8400-Winterthur/Technikumstrasse%2046"}); 
    const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
    
    useEffect(()=>{
        let isLogIn = localStorage.getItem("IsLogIn");
        if(isLogIn !== "yes"){
            navigate("/");
        }

        let run = async() =>{
            let data = await getTeamData();
            console.log(data);
            setTeamInfo(data);    
        }

        run();

    }, [])


    return (
        <Layout>
            {
                isTeamModalOpen? <TeamProfileModal setTeamInfo={setTeamInfo} name={teamInfo.name} league={teamInfo.league} region={teamInfo.region} link={teamInfo.link} closeModal={()=>{setIsTeamModalOpen(false)}}/>:""
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
                    <Button2 text={"Edit"} handleClickEvent={()=>{setIsTeamModalOpen(true)}} />
                </div> 
                <div className="main-page-right">

                </div>
            </div>
        </Layout>
    )
}

export default MainPage;