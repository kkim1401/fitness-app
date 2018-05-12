import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getExerciseById } from '../selectors';

Exercise.propTypes = {
  exercise: PropTypes.object.isRequired,
  exerciseId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

function Exercise({ exercise, exerciseId, userId }) {
  return (
    <li>
      <Link to={`/${userId}/exercises/${exerciseId}`}>{exercise.name}</Link>
    </li>
  );
}
export default connect((state, { exerciseId }) => ({
  exercise: getExerciseById(state, exerciseId),
}))(Exercise);
