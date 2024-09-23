import React from "react";

import "./index.css"

const Select1 = ({icon, placholder, value, width, setValue, ops}) =>{
    return (
        <div className="select1">
            <img src={icon} alt="" />
            <select placeholder={placholder} value={value} style={{width:width}} onChange={(e)=>{setValue(e.target.value)}}>
                {
                    ops.map((op)=><option key={op} value={op}>{op}</option>)
                }
            </select>
        </div>
    )
}

export default Select1;