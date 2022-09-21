import React, {useState} from 'react'
import 'bootstrap'
import "../css/EnDe.css"

export const Button = ({nameBtn, onClickFunction}) => {
    return (
        <div className="EnDeButton">
            <button type="button" className ="btn btn-light" onClick={onClickFunction}>{nameBtn}</button>
        </div>
    )
}