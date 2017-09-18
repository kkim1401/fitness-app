import React from "react";
import {connect} from "react-redux";
import {reduxForm} from "redux-form";
import WorkoutCreationForm from "./WorkoutCreationForm";

export const WorkoutCreationFormContainer = ({handleFormSubmit, values}) => (
    <WorkoutCreationForm
        onSubmit={values => handleFormSubmit(values)}/>
);

const mapDispatchToProps = dispatch => ({
    handleFormSubmit: value => console.log(value)
});

export default reduxForm({
    form: "WorkoutCreationFormContainer"
})(connect(null, mapDispatchToProps)(WorkoutCreationFormContainer));
