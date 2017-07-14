import {combineReducers} from "redux";
import name from "./name";
import age from "./age";
import gender from "./gender";
import maxes from "./maxes";
import id from "./id";


export default combineReducers({name, gender, age, maxes, id});

export const getName = state => state.userInfo.name;
export const getGender = state => state.userInfo.gender;
export const getAge = state => state.userInfo.age;
export const getMaxes = state => state.userInfo.maxes;
export const getId = state => state.userInfo.id;
