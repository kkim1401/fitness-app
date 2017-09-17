import React from "react";
import renderDays from "./Day";
import renderComponents from "./RenderHOC";
import renderField from "./CustomFormElement";
import {Field, FieldArray} from "redux-form";

export const Week = ({node, index}) => (
    <div>
        <Field name={`${node}.week`} elem="input" type="number" component={renderField} label="Week"/>
        <FieldArray name={`${node}.days`} component={renderDays}/>
    </div>
);

export default renderComponents(Week, "Add Week", "Delete Week");
