import React from "react";
import {Link} from "react-router-dom";

const Exercise = ({exercise}) => (
    <li>
        <Link to={`/exercises/${exercise._id}`}>{exercise.name}</Link>
    </li>
);

export default Exercise;

