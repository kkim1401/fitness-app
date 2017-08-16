import React, {Component} from "react";
import withAdd from "./AddHOC";
import ExerciseInstances from "./ExerciseInstance";

export const Day = props => {
    return (
        <div className="day">
            <label>
                Day: <input type="number" name="day" readOnly value={props.number}/>
            </label>
            <ExerciseInstances className="exercise-instances"/>
        </div>
    );
};

export default withAdd(Day);