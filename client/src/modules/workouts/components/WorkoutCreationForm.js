import React, {Component} from "react";
import Week from "./Week";
import withAdd from "./AddHOC";
import {connect} from "react-redux";

export const WorkoutCreationForm = () => {
    function submitForm() {
        
    }

    return(
        <div>
            <h2>Workout Submission</h2>
            <form>
                <label>
                    Name: <input type="text" name="name" defaultValue="name"/>
                </label>
                <label>
                    Description: <textarea name="description"/>
                </label>
                <button name="submit" onSubmit={submitForm}>Submit</button>
            </form>
        </div>
    )
};

export default withAdd(WorkoutCreationForm, Week);