import React from 'react';
import {NavLink} from "react-router-dom";

export default ({link, children}) => (
    <NavLink activeClassName="active" className="link" exact={link === "/"} to={link}>
        {children}
    </NavLink>
);

