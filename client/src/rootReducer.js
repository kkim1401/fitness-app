import {combineReducers} from "redux";
import userInfo from "./modules/users/reducer/index";
import exercises from "./modules/exercises/reducer";

const workoutApp = combineReducers({userInfo, exercises});

export default workoutApp;

