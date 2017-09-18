import React, {Component} from "react";
import {connect} from "react-redux";
import ExerciseList from "./ExerciseList";
import ExerciseCreateWidget from "./ExerciseCreateWidget";
import {addExerciseRequest, fetchExercises} from "../actions";
import {getExercises, getUserId} from "../selectors";
import u from "../../users";
import {withRouter} from "react-router";
import {createStructuredSelector} from "reselect";

export class ExerciseListContainer extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(fetchExercises(this.props.user));
    }

    handleClick(exercise) {
        this.props.dispatch(addExerciseRequest(this.props.user, exercise));
    }

    render() {
        return (
            <div>
                <ExerciseList exercises={this.props.exercises} userId={this.props.user}/>
                <ExerciseCreateWidget addExercise={this.handleClick}/>
            </div>
        );
    }
}

export const mapStateToProps = createStructuredSelector({
    exercises: getExercises,
    user: getUserId
});

export default withRouter(connect(mapStateToProps)(u.components.withTemplate(ExerciseListContainer)));

