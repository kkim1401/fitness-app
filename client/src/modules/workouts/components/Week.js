import React, {Component} from "react";
import {Day} from "./Day";

export class Week extends Component {
    constructor(props) {
        super(props);
        this.state = {
          dayCount: 1
        };
        this.addDay = this.addDay.bind(this);
    }

    addDay() {
        this.setState((prevState) => ({
            dayCount: prevState.dayCount + 1
        }));
    }

    render() {
        const days = [...Array(this.state.dayCount).keys()];

        return (
            <div>
                <label>
                    Week: <input type="number" name="week" value={this.props.number} readOnly/>
                </label>
                {days.map((item, index) => <Day key={index}/>)}
                <button className="add" onClick={this.addDay}>Add Day</button>
            </div>
        )
    }
}