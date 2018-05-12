import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { deleteExercise as deleteExerciseRequest } from '../actions';
import { getExerciseById } from '../selectors';
import u from '../../users';

export const ExerciseDetails = ({ exercise, deleteExercise }) => {
  const { name, description } = exercise;
  return (
    <div>
      <h1>{name}</h1>
      <p>{description}</p>
      <button onClick={deleteExercise}>Delete</button>
    </div>
  );
};

ExerciseDetails.propTypes = {
  exercise: PropTypes.object.isRequired,
  deleteExercise: PropTypes.func.isRequired,
};

export const mapDispatchToProps = (dispatch, { match, history }) => ({
  deleteExercise() {
    history.push('/');
    return dispatch(deleteExerciseRequest(match.params.id));
  },
});

export const mapStateToProps = (state, { match }) => ({
  exercise: getExerciseById(state, match.params.id),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(u.components.withTemplate(ExerciseDetails)));
