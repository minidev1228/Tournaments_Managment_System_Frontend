import React from "react";

import "./index.css"

import playIcon from "../../resources/player.png"
import starIcon from "../../resources/star.png"
import clothIcon from "../../resources/cloth.png"
import phoneIcon from "../../resources/phone.png"
import emailIcon from "../../resources/email.png"
import regionIcon from "../../resources/region.png"

const PlayerCard = ({name, dob, email, number, phone, rank, street}) =>{
    return (
        <div className="player-card">
            <div style={{display:"flex", flexDirection:"row"}}>
                <div className="card-item">
                    <img src={playIcon} alt="" />
                    <h4>{name}</h4>
                </div>
                <div className="card-item">
                    <img src={clothIcon} alt="" />
                    <h4>{number}</h4>
                </div>
                <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                    {
                        [...Array(rank)].map(()=><img src={starIcon} />)
                    }
                </div>
            </div>
            <div style={{display:"flex"}}>
                <div className="card-item">
                    <img src={phoneIcon} alt="" />
                    <h4>{phone}</h4>
                </div>
                <div className="card-item" style={{width:"30%"}}>
                    <img src={emailIcon} alt="" />
                    <h4>{email}</h4>
                </div>
                <div className="card-item" style={{width:"40%"}}>
                    <img src={regionIcon} alt="" />
                    <h4>{street}</h4>
                </div>
            </div>
        </div>
    )
}

export default PlayerCard;