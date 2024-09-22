import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {getTeamPasswordByName, getTeamIdByName} from "../../apis/teamApi"

import Input1 from "../../components/input1" 
import Button1 from "../../components/button1"

import teamIcon from "../../resources/team.png"
import keyIcon from "../../resources/key.png"

import "./index.css"

const SignInPage = () =>{

    const navigate = useNavigate();

    const [teamName, setTeamName] = useState("");
    const [password, setPassword] = useState("");

    const login = async() =>{
        if(password === "" || teamName === ""){
            alert("fill the form!");
            return;
        }
        let pwd = await getTeamPasswordByName(teamName);
        if(pwd === "-"){
            alert("Your team is not registered");
            return;
        }
        if(pwd !== password){
            alert("Wrong password");
            return;
        }
        let id = await getTeamIdByName(teamName);
        localStorage.setItem("IsLogIn", "yes");
        localStorage.setItem("id", id);
        navigate("/myteam");
    }

    return (
        <div className="signin-background">
            <div className="signin-center-div">
                <div>
                    <Input1 placholder={"Team Name"} type={"text"} icon={teamIcon} width={"90%"} value={teamName} setValue={setTeamName} />
                </div>
                <div style={{marginTop:"50px", marginBottom:"50px"}}>
                    <Input1 placholder={"Password"} type={"password"} icon={keyIcon} width={"90%"} value={password} setValue={setPassword} />
                </div>
                <Button1 width={"85%"} handleClickEvent={login} text={"Sign In"}/>
                <div style={{marginTop:"50px", display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <p style={{color:"white", marginRight:"10px"}}>Registered already?</p>
                    <a href="/sign-up" style={{color:"#d7ba91"}}>Sign Up</a>
                </div>
            </div>
        </div>
    )
}

export default SignInPage