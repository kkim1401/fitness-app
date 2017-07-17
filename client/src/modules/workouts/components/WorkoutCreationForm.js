import React, {Component} from "react";
import {connect} from "react-redux";

class WorkoutCreateForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h2>New Workout</h2>
                <form>
                    <h3>General Info</h3>
                    <label>
                        Name: <input type="text" name="name"/>
                    </label>
                    <label>
                        Description: <input type="text" name="description"/>
                    </label>
                </form>
            </div>
        );
    }
}