import React from "react";
import Exercise from "./Exercise";

const ExerciseList = ({exercises}) => (
    <div>
        <ul>
            {exercises.map(exercise =>
                <Exercise
                    exercise={exercise}
                    key={exercise._id}
                />)}
        </ul>
    </div>
);

export default ExerciseList;