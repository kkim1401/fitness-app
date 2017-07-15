import {combineReducers} from "redux";
import name from "./name";
import age from "./age";
import gender from "./gender";
import maxes from "./maxes";
import id from "./id";


export default combineReducers({name, gender, age, maxes, id});


