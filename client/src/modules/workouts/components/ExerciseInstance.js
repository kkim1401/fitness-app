import React from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import e from "../../exercises";
import withAdd from "./AddHOC";

const {getExercises} = e.selectors;

export const ExerciseInstance = ({number, exercises, inputRef}) => (
    <div>
        <label>
            Order: <input type="number" name="order" readOnly value={number} ref={inputRef}/>
        </label>
        <label>
            Exercise: <select ref={inputRef} name="exercises">
                {exercises.map((exercise, index) => <option key={index}>{exercise.name}</option>)}
                </select>
        </label>
        <label>
            Number of sets: <input type="number" name="sets" ref={inputRef}/>
        </label>
        <label>
            Number of reps: <input type="number" name="reps" ref={inputRef}/>
        </label>
        <label>
            Weight: <input type="number" name="weight" ref={inputRef}/>
        </label>
    </div>
);

export const mapStateToProps = createStructuredSelector({
    exercises: getExercises
});

export default connect(mapStateToProps)(withAdd(ExerciseInstance));

