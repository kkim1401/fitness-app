import React from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {Field} from "redux-form";
import e from "../../exercises";
import renderComponents from "./RenderHOC";

const {getExercises} = e.selectors;

export const ExerciseInstance = ({index, exercises, node}) => (
    <div>
        <Field name="order" component="input" label="Order" type="number"/>
        <Field name="exercises" component="select" label="Exercise">
            {exercises.map((exercise, index) => <option key={index}>{exercise.name}</option>)}
        </Field>
        <label>
            Number of sets: <input type="number" name="sets"/>
        </label>
        <Field name="sets" component="input" label="Number of sets" type="number"/>
        <Field name="reps" component="input" label="Number of reps" type="number"/>
        <Field name="weight" component="input" label="Weight" type="number"/>
    </div>
);

export const mapStateToProps = createStructuredSelector({
    exercises: getExercises
});

export default connect(mapStateToProps)(renderComponents(ExerciseInstance, "Add", "Delete Exercise"));

