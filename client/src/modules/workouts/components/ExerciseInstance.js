import React from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import e from "../../exercises";

const {getExercises} = e.selectors;

export const ExerciseInstance = ({number, exercises}) => (
    <div>
        <label>
            Order: <input type="number" name="order" readOnly value={number}/>
        </label>
        <label>
            <select>
                {exercises.map((exercise, index) => <option key={index}>{exercise.name}</option>)}
            </select>
        </label>
        <label>
            Number of sets: <input type="number" name="sets"/>
        </label>
        <label>
            Number of reps: <input type="number" name="reps"/>
        </label>
        <label>
            Weight: <input type="number" name="weight"/>
        </label>
    </div>
);

export const mapStateToProps = createStructuredSelector({
    exercises: getExercises
});

export default connect(mapStateToProps)(ExerciseInstance);

