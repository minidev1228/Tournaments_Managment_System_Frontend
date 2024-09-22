import React from "react";
import { useNavigate } from "react-router-dom";

import Button1 from "../../components/button1";
import Button2 from "../../components/button2";

import dartsMark from "../../resources/darts.png"

import "./index.css"

const Header = () =>{

    const navigate = useNavigate();

    const logOut = () =>{
        localStorage.setItem("isLogin", "no");
        navigate("/");
    }

    return (
        <div className="header">
            <div className="header-top">
                <img src={dartsMark} alt="" />
                <Button1 width={"79px"} handleClickEvent={logOut} text={"Log Out"} />
            </div>
            <div className="header-bottom">
                <Button2  text={"My Team"} handleClickEvent={()=>{navigate("/myteam")}}/>
                <Button2  text={"Button1"} handleClickEvent={()=>{navigate("/myteam")}}/>
                <Button2  text={"Button2"} handleClickEvent={()=>{navigate("/myteam")}}/>
                <Button2  text={"Button3"} handleClickEvent={()=>{navigate("/myteam")}}/>
                <Button2  text={"Button4"} handleClickEvent={()=>{navigate("/myteam")}}/>
            </div>
        </div>
    )
}

export default Header;