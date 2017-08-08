import React, {Component} from "react";
import {Week} from "./Week";
import {connect} from "react-redux";

export class WorkoutCreationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weekCount: 1
        };
        this.addWeek = this.addWeek.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    addWeek() {
        this.setState((prevState) => ({
            weekCount: prevState.weekCount + 1
        }));
    }

    submitForm() {

    }

    render() {
        //Creates an array of increasing numbers, starting from 0, up until weekCount-1.
        const weeks = [...Array(this.state.weekCount).keys()];

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
                    {weeks.map((item, index) => <Week key={index}/>)}
                    <button className="add" onClick={this.addWeek}>Add Week</button>
                    <button name="submit" onSubmit={this.submitForm}>Submit</button>
                </form>
            </div>
        );
    }
}