import React, {Component} from "react";
import {connect} from "react-redux";
import {updateUserDetails, addUserRequest} from "../actions";
import * as selectors from "../selectors";
import withTemplate from "./PageTemplate";
import {createStructuredSelector} from "reselect";


export class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.submitInfo = this.submitInfo.bind(this);
    }

    submitInfo(e) {
        e.preventDefault();
        const {dispatch, name, id} = this.props;
        const user = {
            name: this.name.value,
            gender: this.gender.value,
            age: this.age.value,
            squat: this.squat.value,
            bench: this.bench.value,
            deadlift: this.deadlift.value
        };
        if (!name) {
            dispatch(addUserRequest(user))
        }
        else {
            dispatch(updateUserDetails(id, user))
        }
    }

    render() {
        const {name, gender, age, maxes: {squat, bench, deadlift}} = this.props;
        return (
        <div>
            <form onSubmit={this.submitInfo}>
                <h3>User's Info</h3>
                <label>
                    Name: <input type="text" name="name" ref={node => {this.name = node}} defaultValue={name ? name : ""}/>
                </label>
                <label>
                    Gender: <input type="text" name="gender" ref={node => {this.gender = node}} defaultValue={gender ? gender: ""}/>
                </label>
                <label>
                    Age: <input type="number" name="age" ref={node => {this.age = node}} defaultValue={age ? age: ""}/>
                </label>
                <h3>1RM</h3>
                <label>
                    Squat: <input type="number" name="squat" ref={node => {this.squat = node}} defaultValue={squat ? squat: ""}/>
                </label>
                <label>
                    Bench: <input type="number" name="bench" ref={node => {this.bench = node}} defaultValue={bench ? bench: ""}/>
                </label>
                <label>
                    Deadlift: <input type="number" name="deadlift" ref={node => {this.deadlift = node}} defaultValue={deadlift ? deadlift: ""}/>
                </label>
                <button type="submit">{name ? "Update" : "Submit"}</button>
            </form>
        </div>
    )}
}

export const mapStateToProps = createStructuredSelector({
    name: selectors.getName,
    gender: selectors.getGender,
    age: selectors.getAge,
    maxes: selectors.getMaxes,
    id: selectors.getUserId
});

export default connect(mapStateToProps)(withTemplate(UserInfo));