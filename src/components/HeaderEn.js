import React from 'react'
import 'bootstrap'

import {Link} from "react-router-dom"

export  const Header = ()=>{
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link to='/' className="navbar-brand mb-0 h1">Шифр Цезаря</Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to ='/' className="nav-link active" aria-current="page">Шифрование</Link>
                        </li>
                        <li className="nav-item">
                            <Link to = '/description' className="nav-link">Расшифрование</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}