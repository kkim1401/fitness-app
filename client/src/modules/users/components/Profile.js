import React, {Component} from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import * as selectors from "../selectors";
import withTemplate from "./PageTemplate";

const Profile = ({name, gender, age, maxes: {squat, bench, deadlift}}) => (
    <div>
        <ul>
            <li>Name: {name}</li>
            <li>Gender: {gender}</li>
            <li>Age: {age}</li>
            <li>Maxes:
                <ul>
                    <li>Squat: {squat}</li>
                    <li>Bench: {bench}</li>
                    <li>Deadlift: {deadlift}</li>
                </ul>
            </li>
        </ul>
    </div>
);

const mapStateToProps = createStructuredSelector({
    name: selectors.getName,
    gender: selectors.getGender,
    age: selectors.getAge,
    maxes: selectors.getMaxes
});

export default connect(mapStateToProps)(withTemplate(Profile));

