import {ADD_USER, DELETE_USER} from "../../modules/Users/actions";

export default (state = "", action) => {
    switch (action.type) {
        case ADD_USER: {
            return action.user.gender;
        }
        case DELETE_USER: {
            return "";
        }
        default: {
            return state;
        }
    }
};

