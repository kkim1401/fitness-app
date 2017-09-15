import React from "react";
import Exercise from "./Exercise";

const ExerciseList = ({exercises, userId}) => (
    <div>
        <ul>
            {exercises.map(exercise =>
                <Exercise
                    exercise={exercise}
                    key={exercise._id}
                    userId={userId}
                />)}
        </ul>
    </div>
);

export default ExerciseList;