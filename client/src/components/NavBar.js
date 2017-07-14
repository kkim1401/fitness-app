import React from 'react';
import Page from "./Page";
import {connect} from "react-redux";
import {getId} from "../modules/users/reducer/index";

const NavBar = ({id}) => (
    <nav>
        <Page link="/">Home</Page>
        <Page link="/userInfo">UserInfo</Page>
        <Page link="/plan">Plan</Page>
        <Page link={id ? `/${id}/exercises` : `exercises`}>Exercises</Page>
    </nav>
);

const mapStateToProps = state => ({
    id: getId(state)
});

export default connect(mapStateToProps)(NavBar)



