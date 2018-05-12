import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as selectors from '../selectors';
import { createStructuredSelector } from 'reselect';

export const ProfileBar = ({ name }) => <div><Link to="/profile">{name}</Link></div>;

export const mapStateToProps = createStructuredSelector({
  name: selectors.getName,
});

export default connect(mapStateToProps)(ProfileBar);
