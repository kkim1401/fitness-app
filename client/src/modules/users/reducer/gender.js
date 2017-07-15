import * as u from "../actionTypes";

export default (state = "", action) => {
    switch (action.type) {
        case u.ADD: {
            return action.user.gender;
        }
        case u.DELETE: {
            return "";
        }
        default: {
            return state;
        }
    }
};

