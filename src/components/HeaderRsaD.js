import React from 'react'
import 'bootstrap'

import {Link} from "react-router-dom"

export  const HeaderRsaD = ()=>{
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light " >
            <div className="container-fluid">
                <Link to='/rsa/encription' className="navbar-brand mb-0 h2">Шифросистема RSA</Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to ='/rsa/encription' className="nav-link " aria-current="page">Шифрование</Link>
                        </li>
                        <li className="nav-item">
                            <Link to = '/rsa/description' className="nav-link active">Расшифрование</Link>
                        </li>
                    </ul>
                </div>
                <div className="d-flex">
                    <Link to='/' className="navbar-brand mb-0 h1">В начало</Link>
                </div>
            </div>

        </nav>
    )
}