import {createStore, applyMiddleware} from "redux";
import {createLogger} from "redux-logger";
import thunkMiddleware from "redux-thunk";
import workoutApp from "../rootReducer";


export default function configureStore(preloadedState) {
    return createStore(
        workoutApp,
        preloadedState,
        applyMiddleware(
            createLogger(),
            thunkMiddleware
        )
    )
};

