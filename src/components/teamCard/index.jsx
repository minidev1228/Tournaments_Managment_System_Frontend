import React from "react";

import "./index.css"

import playIcon from "../../resources/team-p.png"
import starIcon from "../../resources/star.png"
import leagueIcon from "../../resources/league.png"
import linkIcon from "../../resources/link.png"
import regionIcon from "../../resources/region.png"

const TeamCard = ({name, link, rank, league, street}) =>{
    return (
        <div className="player-card">
            <div style={{display:"flex", flexDirection:"row"}}>
                <div className="card-item">
                    <img src={playIcon} alt="" />
                    <h4>{name}</h4>
                </div>
                <div className="card-item">
                    <img src={leagueIcon} alt="" />
                    <h4>{league}</h4>
                </div>
                <div style={{display:"flex", flexDirection:"row", alignItems:"center", width:"200px"}}>
                    {
                        [...Array(rank)].map(()=><img src={starIcon} />)
                    }
                </div>
            </div>
            <div style={{display:"flex"}}>
                <div className="card-item" style={{width:"50%"}}>
                    <img src={linkIcon} alt="" />
                    <h4><a href={link}>{link}</a></h4>
                </div>
                <div className="card-item" style={{width:"40%"}}>
                    <img src={regionIcon} alt="" />
                    <h4>{street}</h4>
                </div>
            </div>
        </div>
    )
}

export default TeamCard;