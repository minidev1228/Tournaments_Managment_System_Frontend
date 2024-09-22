import React from "react";

import "./index.css"

const Input1 = ({width, icon, type, value, setValue, placholder}) =>{

    return (
        <div className="input1">
            <img src={icon} alt="" />
            <input type={type} placeholder={placholder} value={value} style={{width:width}} onChange={(e)=>{setValue(e.target.value)}} />
        </div>
    )
}

export default Input1;