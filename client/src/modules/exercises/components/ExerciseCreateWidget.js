import React from "react";

const ExerciseCreateWidget = ({addExercise}) => {
    let nameInput, descriptionInput;
    function sendData() {
        const name = nameInput.value,
            description = descriptionInput.value;

        if (name) {
            addExercise({name, description});
            nameInput.value = descriptionInput.value = "";
        }
        else {
            console.log("Name field missing!");
        }
    }
    return (
    <div>
        <input type="text" placeholder="name" ref={input => {nameInput = input}}/>
        <input type ="text" placeholder="description" ref={input => {descriptionInput = input}}/>
        <button onClick={sendData}>Add</button>
    </div>
)};

export default ExerciseCreateWidget;