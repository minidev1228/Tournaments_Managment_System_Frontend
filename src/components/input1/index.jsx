import React from "react";

import "./index.css"

const Input1 = ({width, icon, type, value, setValue}) =>{

    return (
        <div className="input1" >
            <img src={icon} alt="" />
            <input type={type} value={value} onChange={(e)=>{setValue(e.value)}} />
        </div>
    )
}

return Input1