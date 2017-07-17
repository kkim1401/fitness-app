import React from 'react';
import Page from "./Page";
import {connect} from "react-redux";
import * as selectors from "../selectors";
import {createStructuredSelector} from "reselect";

const NavBar = ({id}) => (
    <nav>
        <Page link="/">Home</Page>
        <Page link="/userInfo">UserInfo</Page>
        <Page link="/plan">Plan</Page>
        <Page link={id ? `/${id}/exercises` : `exercises`}>Exercises</Page>
    </nav>
);

const mapStateToProps = createStructuredSelector({
    id: selectors.getUserId
});

export default connect(mapStateToProps)(NavBar)



