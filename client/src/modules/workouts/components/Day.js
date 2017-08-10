import React, {Component} from "react";
import withAdd from "./AddHOC";
import ExerciseInstance from "./ExerciseInstance";

export const Day = props => {
    return (
        <div>
            <label>
                Day: <input type="number" name="day" readOnly value={props.number}/>
            </label>
            <h4>Exercises</h4>
        </div>
    );
};

export default withAdd(Day, ExerciseInstance);