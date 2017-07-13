import React, {Component} from "react";
import {connect} from "react-redux";
import {getName, getGender, getAge, getMaxes} from "../reducers/userInfo/index";
import withTemplate from "../components/PageTemplate";

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

const mapStateToProps = state => ({
    name: getName(state),
    gender: getGender(state),
    age: getAge(state),
    maxes: getMaxes(state)
});

export default connect(mapStateToProps)(withTemplate(Profile));

