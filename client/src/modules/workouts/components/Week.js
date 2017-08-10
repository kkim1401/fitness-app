import React, {Component} from "react";
import Day from "./Day";
import withAdd from "./AddHOC";

export const Week = props => (
    <label>
        Week: <input type="number" name="week" value={props.number} readOnly/>
    </label>
);

export default withAdd(Week, Day);

