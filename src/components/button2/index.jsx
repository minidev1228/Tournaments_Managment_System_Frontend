import React from "react";

import "./index.css"

const Button2 = ({text, handleClickEvent}) =>{
    return (
        <button className="button2" onClick={handleClickEvent}>
            {text}
        </button>
    )
}

export default Button2;