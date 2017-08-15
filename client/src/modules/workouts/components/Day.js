import React, {Component} from "react";
import withAdd from "./AddHOC";
import ExerciseInstances from "./ExerciseInstance";

export const Day = props => {
    return (
        <section className="day">
            <label>
                Day: <input type="number" name="day" readOnly value={props.number} ref={props.inputRef}/>
            </label>
            <ExerciseInstances/>
        </section>
    );
};

export default withAdd(Day);