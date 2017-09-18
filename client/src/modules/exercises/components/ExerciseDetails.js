import React from "react";
import {connect} from "react-redux";
import {deleteExerciseRequest} from "../actions";
import {getExercise as mapStateToProps} from "../selectors";
import {withRouter} from "react-router";
import u from "../../users";

export const ExerciseDetails = ({exercise, deleteExercise}) => {
    const {name, description} = exercise;
    return (
        <div>
            <h1>{name}</h1>
            <p>{description}</p>
            <button onClick={deleteExercise}>Delete</button>
        </div>
    )
};

export const mapDispatchToProps = (dispatch, {match, history}) => ({
    deleteExercise() {
        history.push("/");
        return dispatch(deleteExerciseRequest(match.params.user, match.params.id));
    }
});

export {mapStateToProps};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(u.components.withTemplate(ExerciseDetails)));

