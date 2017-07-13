import React from "react";
import {connect} from "react-redux";
import NavBar from "./NavBar";

const Plan = ({squat, bench, deadlift}) => (
    <section>
        <NavBar/>
        <section className="day">
            <h3>Day 1</h3>
            <p>Squat: 5x5 at {squat*.80}</p>
            <p>Bench: 5x5 at {bench*.80}</p>
            <p>Deadlifts: 1x5 at {deadlift*.85}</p>
        </section>
    </section>
);

const mapStateToProps = ({
    userInfo:{
        max:{squat, bench, deadlift}
    }}) => ({squat, bench, deadlift});

export default connect(mapStateToProps)(Plan);

