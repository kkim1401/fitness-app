import React, {Component} from "react";
import "./WorkoutCreationForm.css";
import Weeks from "./Week";
import {connect} from "react-redux";


class WorkoutCreationForm extends Component {
    constructor(props) {
        super(props);
        this.storeInMap = this.storeInMap.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    storeInMap(el) {
        //this.formElementsMap.set(el, el.value);
    }

    submitForm(e) {
        e.preventDefault();
        console.log(this.formElementsMap);
    }

    render() {
        this.formElementsMap = new Map();
        return (
            <div className="main">
                <h2>Workout Submission</h2>
                <form onSubmit={this.submitForm}>
                    <fieldset className="general-info">
                        <label>
                            Name: <input type="text" name="name" defaultValue="name" ref={el => this.storeInMap(el)}/>
                        </label>
                        <label>
                            Description: <textarea name="description" ref={el => this.storeInMap(el)}/>
                        </label>
                    </fieldset>
                    <Weeks className="weeks" inputRef={el => this.storeInMap(el)}/>
                    <button name="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default WorkoutCreationForm;