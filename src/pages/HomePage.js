import React from 'react'
import 'bootstrap'

import {Link} from "react-router-dom"

export const HomePage = () =>{
    return (
        <div className=" btn-group-vertical HomeBtn">
            <div>
                <Link to='/encription' className="btn btn-light mb-0 HomeBtnSize">Шифр Цезаря</Link>
            </div>
            <div>
                <Link to='/rsa/encription' className="btn btn-light mb-0 HomeBtnSize">Шифросистема RSA</Link>
            </div>
        </div>
    )

}