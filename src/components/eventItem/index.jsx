import React from "react";

import "./index.css"

const EventItem = ({status, date, hteam, gteam, handleClickEvent}) =>{
    return (
        <div className="event-item" onClick={handleClickEvent} style={{backgroundColor:status?"#212433":"#212443"}}>
            <p>{date}</p>
            <h3>{`${hteam} VS ${gteam}`}</h3>
        </div>
    )
}

export default EventItem