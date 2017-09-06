import React from "react";
import renderDays from "./Day";
import renderComponents from "./RenderHOC";
import {Field, FieldArray} from "redux-form";

export const Week = ({node, index}) => (
    <div>
        <Field name={node} type="number" component="input" label={`Week #${index+1}`}/>
        <FieldArray name={`${node}.days`} component={renderDays}/>
    </div>
);

export default renderComponents(Week, "Add Week", "Delete Week");
