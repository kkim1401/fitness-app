import React from "react";
import {connect} from "react-redux";
import {deleteExerciseRequest} from "../actions";
import {getExercise} from "../selectors";
import {withRouter} from "react-router";
import u from "../../users";

const ExerciseDetails = ({exercise, deleteExercise}) => {
    const {name, description} = exercise;
    return (
        <div>
            <h1>{name}</h1>
            <p>{description}</p>
            <button onClick={deleteExercise}>Delete</button>
        </div>
    )
};

const mapDispatchToProps = (dispatch, {match, history}) => ({
    deleteExercise() {
        dispatch(deleteExerciseRequest(match.params.id));
        history.push("/exercises");
    }
});

export default withRouter(connect(
    getExercise,
    mapDispatchToProps
)(u.components.withTemplate(ExerciseDetails)));

