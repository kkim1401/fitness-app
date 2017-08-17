import React, {Component} from "react";
import Days from "./Day";
import withAdd from "./AddHOC";

export const Week = ({number, inputRef}) => {
    return (
        <div>
            <label>
                Week: <input type="number" name="week" value={number} ref={inputRef} readOnly/>
            </label>
            <Days className="days" inputRef={inputRef}/>
        </div>
    )
};

export default withAdd(Week);

