import React from "react";

import "./index.css"

const Button2 = ({text, handleClickEvent, width}) =>{
    return (
        <button className="button2" onClick={handleClickEvent} style={{width:width}}>
            {text}
        </button>
    )
}

export default Button2;