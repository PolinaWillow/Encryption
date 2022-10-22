import React from 'react'
import 'bootstrap'

import {Link} from "react-router-dom"

export  const Header = ({name})=>{
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link to='/rsa/encription' className="navbar-brand mb-0 h1">Шифросистема {name}</Link>

                <div className="d-flex">
                    <Link to='/' className="navbar-brand mb-0 h1">В начало</Link>
                </div>
            </div>
        </nav>
    )
}