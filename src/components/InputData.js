import React, {useState} from 'react'
import 'bootstrap'
import "../css/EnDe.css"

export const InputData = ({labelText, nameInput, idInput, onChangeFunction}) =>{
    return(
        <div>
            <label className="form-label">{labelText}</label>
            <input type="text" className="form-control" name = {nameInput} id={idInput} onChange={onChangeFunction}/>
        </div>
    )
}