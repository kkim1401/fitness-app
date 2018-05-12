import React, { Component } from 'react';
// import "./WorkoutCreationForm.css";
import renderWeeks from './Week';
import { reduxForm, Field, FieldArray } from 'redux-form';
import renderField from './CustomFormElement';

class WorkoutCreationForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <h2>Workout Creation Form</h2>
        <fieldset className="general-info">
          <Field name="name" elem="input" component={renderField} type="text" label="Name" />
          <Field name="description" elem="textarea" component={renderField} label="Description" />
        </fieldset>
        <FieldArray name="schedule.weeks" component={renderWeeks} />
        <button name="submit">Submit</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'WorkoutCreationForm',
})(WorkoutCreationForm);
