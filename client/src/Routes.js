import React from "react";
import {Provider} from "react-redux";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./components/Home";
import configureStore from "./store/configureStore";
import UserInfo from "./containers/UserInfo";
import Plan from "./components/Plan";
import ExerciseList from "./containers/ExerciseListContainer";
import ExerciseDetails from "./containers/ExerciseDetails";
import Profile from "./containers/Profile";

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


