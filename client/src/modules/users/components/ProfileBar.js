import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import * as selectors from "../selectors";
import {createStructuredSelector} from "reselect";

const mapStateToProps = createStructuredSelector({
    name: selectors.getName
});

export default connect(mapStateToProps)(({name}) => <div><Link to="/profile">{name}</Link></div>);
