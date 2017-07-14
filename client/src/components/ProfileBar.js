import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {getName} from "../modules/users/reducer/index";

const mapStateToProps = state => ({name: getName(state)});

export default connect(mapStateToProps)(({name}) => <div><Link to="/profile">{name}</Link></div>);
