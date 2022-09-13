import React, {useState} from 'react'
import 'bootstrap'
import "../css/EnDe.css"
import {HeaderRsaE} from "../components/HeaderRsaE";

export const RsaE = () =>{
    const [form, setForm] = useState({
        enString: ''
    })

    const [resultStr, setResultStr] = useState('')

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    function ButEncription(){

    }

    return(
        <div>
            <HeaderRsaE/>
            <div className="EnDeBody">
                <div id = "enString">
                    <label className="form-label">Введите строку для шифрования</label>
                    <input type="text" className="form-control" name = "enString" id="enInpStr" onChange={changeHandler}/>
                </div>

                <div className="EnDeButton">
                    <button type="button" className ="btn btn-light" onClick={ButEncription}>Зашифровать</button>
                </div>
                <div id = "enRes">
                    <label className="form-label">Результат шифрования</label>
                    <input type="text" className="form-control" name = "enRes" value={resultStr}/>
                </div>

            </div>
        </div>
    )
}