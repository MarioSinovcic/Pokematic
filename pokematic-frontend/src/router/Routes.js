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
            <Route path="/login">
                    <Login />
            </Route>
            <Route path="/team-search">
                    <TeamSearch />
            </Route>
            <Route path="/profile">
                    <Profile />
            </Route>
            <Route path="/pokedex">
                    <Pokedex />
            </Route>
            <Route path="/board">
                    <Board />
            </Route>
            <Route path="/login" component={Login} />
            <Route component={NotFound} />
        </Switch>
    );
};

export default Routes;