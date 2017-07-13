import React, {Component} from "react";
import {connect} from "react-redux";
import {deleteExerciseRequest} from "../actions/exerciseActions";
import {getExercise} from "../reducers/exerciseReducer";
import {withRouter} from "react-router";
import withTemplate from "../components/PageTemplate";

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

const mapStateToProps = (state, {match}) => ({
    exercise: getExercise(state, match.params.id)
});

const mapDispatchToProps = (dispatch, {match, history}) => ({
    deleteExercise() {
        dispatch(deleteExerciseRequest(match.params.id));
        history.push("/exercises");
    }
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(withTemplate(ExerciseDetails)));

