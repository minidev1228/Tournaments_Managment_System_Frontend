import React from "react";

import "./index.css"

const Button1 = ({handleClickEvent, width, text}) =>{
    return (
        <button style={{width}} onClick={handleClickEvent} className="button1">
            {text}
        </button>
    )
}

export default Button1