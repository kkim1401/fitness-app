import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import users from "../../users";
import {createStructuredSelector} from "reselect";

const mapStateToProps = createStructuredSelector({
    name: users.selectors.getName
});

export default connect(mapStateToProps)(({name}) => <div><Link to="/profile">{name}</Link></div>);
