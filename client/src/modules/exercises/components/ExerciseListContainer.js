import React, {Component} from "react";
import {connect} from "react-redux";
import ExerciseList from "./ExerciseList";
import ExerciseCreateWidget from "./ExerciseCreateWidget";
import {addExerciseRequest, fetchExercises} from "../actions";
import {getExercises, getUserId} from "../selectors";
import core from "../../core/components";
import {withRouter} from "react-router";
import {createStructuredSelector} from "reselect";

class ExerciseListContainer extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(fetchExercises(this.props.user));
    }

    handleClick(exercise) {
        this.props.dispatch(addExerciseRequest(exercise, this.props.user));
    }

    render() {
        return (
            <div>
                <ExerciseList exercises={this.props.exercises}/>
                <ExerciseCreateWidget addExercise={this.handleClick}/>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    exercises: getExercises,
    user: getUserId
});

export default withRouter(connect(mapStateToProps)(core.withTemplate(ExerciseListContainer)));

