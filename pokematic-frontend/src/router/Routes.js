import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../pages/Login";
import TeamSearch from "../pages/TeamSearch";
import Profile from "../pages/Profile";
import Pokedex from "../pages/Pokedex";
import Board from "../pages/Board";
import NotFound from "../pages/NotFound";

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/login" component={Login}/>
            <Route path="/team-search" component={TeamSearch}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/pokedex" component={Pokedex}/>
            <Route name="board" path="/board/:teamName" component={Board}/>
            <Route path="/login" component={Login} />
            <Route component={NotFound} />
        </Switch>
    );
};

export default Routes;