import React from 'react';
import {NavLink} from "react-router-dom";

const Page = ({link, children}) => (
    <NavLink activeClassName="active" className="link" exact={link === "/"} to={link}>
        {children}
    </NavLink>
);

export default Page;