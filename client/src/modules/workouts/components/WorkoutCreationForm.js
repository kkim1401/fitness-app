import React, {Component} from "react";
//import "./WorkoutCreationForm.css";
import renderWeeks from "./Week";
import {reduxForm, Field, FieldArray} from "redux-form";

class WorkoutCreationForm extends Component {
    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm(e) {
        e.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.submitForm}>
                <h2>Workout Creation Form</h2>
                <fieldset className="general-info">
                    <Field name="name" component="input" type="text" label="Name"/>
                    <Field name="description" component="textarea" label="Description"/>
                </fieldset>
                <FieldArray name="weeks" component={renderWeeks}/>
                <button name="submit">Submit</button>
            </form>
        )
    }
}

export default reduxForm({
    form: "workoutCreationForm"
})(WorkoutCreationForm);