import React from "react"
import {Switch, Route, Redirect} from "react-router-dom";
import {HomePage} from "./pages/HomePage";
import {RSA} from "./pages/RSA";
import {ElGamalsCipher} from "./pages/ElGamalsCipher"
import {CeasarsCipher} from "./pages/CeasarsCipher";

export const Main = () => {
    return (
        <Switch>
            <Route exact path='/' component={HomePage}/>
            <Route exact path='/ceasars_cipher' component={CeasarsCipher}/>
            <Route exact path='/rsa' component={RSA}/>
            <Route exact path='/el_gamals_cipher' component={ElGamalsCipher}/>
            <Redirect to='/' />
        </Switch>
    )
}