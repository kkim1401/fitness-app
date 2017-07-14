import React from "react";
import {Provider} from "react-redux";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./components/Home";
import configureStore from "./store/configureStore";
import UserInfo from "./modules/users/components/UserInfo";
import Plan from "./modules/workouts/components/Plan";
import ExerciseList from "./modules/exercises/components/ExerciseListContainer";
import ExerciseDetails from "./modules/exercises/components/ExerciseDetails";
import Profile from "./modules/users/components/Profile";

export const Routes = ({store}) => (
    <Provider store={configureStore()}>
        <Router>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/userInfo" component={UserInfo}/>
                <Route path="/:user/userInfo" component={UserInfo}/>
                <Route path="/plan" component={Plan}/>
                <Route exact path="/:user/exercises" component={ExerciseList}/>
                <Route path="/exercises/:id" component={ExerciseDetails}/>
                <Route path="/profile" component={Profile}/>
            </Switch>
        </Router>
    </Provider>
);


