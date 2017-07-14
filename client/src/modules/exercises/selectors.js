import { NAME } from "./constants";

export const getExercises = state => state.exercises;
export const getExercise = (state, props) => state.exercises.filter(exercise => exercise._id === props.match.params.id)[0];

