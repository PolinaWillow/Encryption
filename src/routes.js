import React from "react"
import {Switch, Route, Redirect} from "react-router-dom";
import {Encription} from "./pages/Encription";
import {Decription} from "./pages/Decription"
import {HomePage} from "./pages/HomePage";
import {RSA} from "./pages/RSA";

export const Main = () => {
    return (
        <Switch>
            <Route exact path='/' component={HomePage}/>
            <Route exact path='/rsa' component={RSA}/>
            <Route exact path='/encription' component={Encription}/>
            <Route exact path='/description' component={Decription}/>
            <Redirect to='/' />
        </Switch>
    )
}