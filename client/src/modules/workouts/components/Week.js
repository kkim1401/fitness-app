import React, {Component} from "react";
import Days from "./Day";
import withAdd from "./AddHOC";

export const Week = props => {
    return (
        <div className="week">
            <label>
                Week: <input type="number" name="week" value={props.number} readOnly/>
            </label>
            <Days className="days"/>
        </div>
    )
};

export default withAdd(Week);

