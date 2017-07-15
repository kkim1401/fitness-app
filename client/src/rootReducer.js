import {combineReducers} from "redux";
import users from "./modules/users";
import exercises from "./modules/exercises";

const workoutApp = combineReducers({
    [users.constants.NAME]: users.reducer,
    [exercises.constants.NAME]: exercises.reducer
});

export default workoutApp;

