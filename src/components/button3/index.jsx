import React from "react";

import "./index.css"

const Button3 = ({text, handleClickEvent, width}) =>{
    return (
        <button className="button3" onClick={handleClickEvent} style={{width:width}}>
            {text}
        </button>
    )
}

export default Button3;