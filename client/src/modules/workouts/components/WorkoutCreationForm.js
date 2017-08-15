import React, {Component} from "react";
import "./WorkoutCreationForm.css";
import Weeks from "./Week";
import {connect} from "react-redux";


const WorkoutCreationForm = () => {
    const formElementsMap = new Map();

    function submitForm(e) {
        e.preventDefault();
        console.log(formElementsMap);
    }

    return(
        <div className="main">
            <h2>Workout Submission</h2>
            <form onSubmit={submitForm}>
                <fieldset className="general-info">
                    <label>
                        Name: <input type="text" name="name" defaultValue="name"/>
                    </label>
                    <label>
                        Description: <textarea name="description"/>
                    </label>
                </fieldset>
                <Weeks inputRef = {el => formElementsMap.set(el, el.value)}/>
                <button name="submit">Submit</button>
            </form>
        </div>
    )
};

export default WorkoutCreationForm;