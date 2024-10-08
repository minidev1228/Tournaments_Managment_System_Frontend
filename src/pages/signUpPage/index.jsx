import React, { useState } from "react";

import {addNewTeam, getTeamPasswordByName} from "../../apis/teamApi"

import Input1 from "../../components/input1" 
import Button1 from "../../components/button1"
import Select1 from "../../components/select1"

import teamIcon from "../../resources/team.png"
import keyIcon from "../../resources/key.png"
import roleIcon from "../../resources/role.png"

import "./index.css"

const SignUpPage = () =>{

    const [teamName, setTeamName] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [role, setRole] = useState("player");

    const regist = async () =>{
        console.log(role);
        if(password === "" || teamName === "" || rePassword === ""){
            alert("fill the form!");
            return;
        }
        let pwd = await getTeamPasswordByName(teamName, role);
        if(pwd !== "-"){
            alert("Your team is registed already!");
            return;
        }
        if(password !== rePassword){
            alert("Passwords are not matched!");
            return;
        }
        await addNewTeam(teamName, password, role);
        alert(`${teamName} team is registered successfully!`);
    }

    return (
        <div className="signin-background">
            <div className="signin-center-div">
                <div>
                    <Select1 placholder={"Role"} icon={roleIcon} width={"207px"} value={role} setValue={setRole} ops={["player", "captain"]} />
                </div>
                <div style={{marginTop:"30px"}}>
                    <Input1 placholder={"Name"} type={"text"} icon={teamIcon} width={"90%"} value={teamName} setValue={setTeamName} />
                </div>
                <div style={{marginTop:"50px"}}>
                    <Input1 placholder={"Password"} type={"password"} icon={keyIcon} width={"90%"} value={password} setValue={setPassword} />
                </div>
                <div style={{marginTop:"50px", marginBottom:"50px"}}>
                    <Input1 placholder={"Password confirm"} type={"password"} icon={keyIcon} width={"90%"} value={rePassword} setValue={setRePassword} />
                </div>
                <Button1 width={"85%"} handleClickEvent={regist} text={"Sign Up"}/>
                <div style={{marginTop:"50px", display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <a href="/" style={{color:"#d7ba91"}}>Go to Sign In</a>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage;