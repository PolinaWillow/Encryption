import React from 'react'
import 'bootstrap'

import {Link} from "react-router-dom"

export const HomePage = () =>{
    return (
        <div className=" btn-group-vertical HomeBtn">
            <div>
                <Link to='/ceasars_cipher' className="btn btn-light mb-0 HomeBtnSize">Шифр Цезаря</Link>
            </div>
            <div>
                <Link to='/rsa' className="btn btn-light mb-0 HomeBtnSize">Шифросистема RSA</Link>
            </div>
            <div>
                <Link to='/el_gamals_cipher' className="btn btn-light mb-0 HomeBtnSize">Шифросистема Эль-Гамаля</Link>
            </div>
        </div>
    )

}