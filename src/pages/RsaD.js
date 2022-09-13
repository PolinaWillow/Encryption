import React, {useState} from 'react'
import 'bootstrap'
import "../css/EnDe.css"
import {HeaderRsaD} from "../components/HeaderRsaD";

export const RsaD = () =>{
    const [form, setForm] = useState({
        deString: ''
    })

    const [resultStr, setResultStr] = useState('')

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    function ButDescription(){

    }
    return(
        <div>
            <HeaderRsaD/>
            <div className="EnDeBody">
                <div id = "enString">
                    <label className="form-label">Введите строку для расшифровки</label>
                    <input type="text" className="form-control" name = "deString" id="deInpStr" onChange={changeHandler}/>
                </div>

                <div className="EnDeButton">
                    <button type="button" className ="btn btn-light" onClick={ButDescription}>Зашифровать</button>
                </div>
                <div id = "enRes">
                    <label className="form-label">Результат расшифровки</label>
                    <input type="text" className="form-control" name = "deRes" value={resultStr}/>
                </div>

            </div>
        </div>
    )
}