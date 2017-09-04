import React, {Component} from "react";
import withAdd from "./AddHOC";
import ExerciseInstances from "./ExerciseInstance";

export const Day = ({number, inputRef}) => {
    return (
        <div>
            <label>
                Day: <input type="number" name="day" ref={inputRef} readOnly value={number}/>
            </label>
            <ExerciseInstances className="exercise-instances" inputRef={inputRef}/>
        </div>
    );
};

export default withAdd(Day);