import React from "react";
import {Provider} from "react-redux";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import core from "./modules/core/components";
import configureStore from "./store/configureStore";
import users from "./modules/users";
import Plan from "./modules/workouts/components/Plan";
import exercises from "./modules/exercises";

const {Home} = core;
const {UserInfo, Profile} = users.components;
const {ExerciseListContainer, ExerciseDetails} = exercises.components;

export const Routes = ({store}) => (
    <Provider store={configureStore()}>
        <Router>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/userInfo" component={UserInfo}/>
                <Route path="/:user/userInfo" component={UserInfo}/>
                <Route path="/plan" component={Plan}/>
                <Route exact path="/:user/exercises" component={ExerciseListContainer}/>
                <Route path="/exercises/:id" component={ExerciseDetails}/>
                <Route path="/profile" component={Profile}/>
            </Switch>
        </Router>
    </Provider>
);


