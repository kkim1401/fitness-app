import React from "react";
import {Field, FieldArray} from "redux-form";
import renderExerciseInstances from "./ExerciseInstance";
import renderComponents from "./RenderHOC";
import renderField from "./CustomFormElement";

export const Day = ({node, index}) => (
    <div>
        <Field name={`${node}.day`} type="number" component={renderField} elem="input" label="Day"/>
        <FieldArray name={`${node}.exerciseList`} component={renderExerciseInstances}/>
    </div>
);


export default renderComponents(Day, "Add Day", "Delete Day");