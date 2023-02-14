import './App.css';
import React from "react";
import {Route, Switch} from "react-router-dom";
import HomePage from "./pages/home/HomePage";

function App() {
    return (
        <div>
            <Switch>
                <Route exact path="/">
                    <HomePage/>
                </Route>
            </Switch>
        </div>
    );
}

export default App;