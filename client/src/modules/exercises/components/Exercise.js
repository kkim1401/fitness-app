import React from "react";
import {Link} from "react-router-dom";

const Exercise = ({exercise, userId}) => (
    <li>
        <Link to={`/${userId}/exercises/${exercise._id}`}>{exercise.name}</Link>
    </li>
);

export default Exercise;

