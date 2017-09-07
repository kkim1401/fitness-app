import React, {Component} from "react";
import {Field, FieldArray} from "redux-form";
import renderExerciseInstances from "./ExerciseInstance";
import renderComponents from "./RenderHOC";
import renderField from "./CustomFormElement";

export const Day = ({node, index}) => (
    <div>
        <Field name={node} type="number" component={renderField} elem="input" label={`Day #${index+1}`}/>
        <FieldArray name={`${node}.exerciseInstances`} component={renderExerciseInstances}/>
    </div>
);


export default renderComponents(Day, "Add Day", "Delete Day");