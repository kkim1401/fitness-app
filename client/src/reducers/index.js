import {combineReducers} from "redux";
import userInfo from "./userInfo/index";
import exercises from "./exerciseReducer";

const workoutApp = combineReducers({userInfo, exercises});

export default workoutApp;

