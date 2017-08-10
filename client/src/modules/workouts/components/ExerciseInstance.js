import React from "react";

export const ExerciseInstance = props => (
    <div>
        <label>
            Order: <input type="number" name="order" readOnly value={props.number}/>
        </label>
        <label>
            <select>
                <option></option>
            </select>
        </label>
    </div>
);