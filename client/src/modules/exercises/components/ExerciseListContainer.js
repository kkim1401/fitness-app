import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';
import ExerciseList from './ExerciseList';
import ExerciseCreateWidget from './ExerciseCreateWidget';
import { addExercise, fetchExercises } from '../actions';
import { getExercises, getUserId } from '../selectors';
import u from '../../users';

export class ExerciseListContainer extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchExercises(this.props.user));
  }

  handleClick(exercise) {
    this.props.dispatch(addExercise(this.props.user, exercise));
  }

  render() {
    return (
      <div>
        <ExerciseList exercises={this.props.exercises} userId={this.props.user} />
        <ExerciseCreateWidget addExercise={this.handleClick} />
      </div>
    );
  }
}

export const mapStateToProps = createStructuredSelector({
  exercises: getExercises,
  user: getUserId,
});

export default withRouter(connect(mapStateToProps)(u.components.withTemplate(ExerciseListContainer)));
