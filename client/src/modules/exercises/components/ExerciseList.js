import React from 'react';
import Exercise from './Exercise';

const ExerciseList = ({ exercises, userId }) => (
  <div>
    <ul>
      {exercises.map(exerciseId =>
        (<Exercise
          exerciseId={exerciseId}
          key={exerciseId}
          userId={userId}
        />))}
    </ul>
  </div>
);

export default ExerciseList;
