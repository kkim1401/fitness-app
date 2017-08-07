import React, {Component} from "react";
import {Week} from "./Week";
import {connect} from "react-redux";

export const WorkoutCreationForm = () => (
    <div>
        <h2>Workout Submission</h2>
        <form>
            <label>
                Name: <input type="text" name="name" defaultValue="name"/>
            </label>
            <label>
                Description: <textarea name="description"/>
            </label>
            <Week/>
        </form>
    </div>
);