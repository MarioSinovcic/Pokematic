import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../pages/Login";
import TeamSearch from "../pages/TeamSearch";
import Profile from "../pages/Profile";
import Pokedex from "../pages/Pokedex";
import Board from "../pages/Board";
import NotFound from "../pages/NotFound";
import Callback from "../Auth0/Callback";

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/login" component={Login}/>
            <Route exact path='/callback' component={Callback}  />
            <Route path="/team-search" component={TeamSearch}/>
            <Route path="/profile" component={Profile}/>
            <Route name="pokedex" path="/pokedex/:teamName" component={Pokedex}/>
            <Route name="board" path="/board/:teamName" component={Board}/>
            <Route component={NotFound} />
        </Switch>
    );
};

export default Routes;