import React from "react";

const renderComponents = (InnerComponent, addText, deleteText) => ({fields}) => (
    <ul>
        <li>
            <button type="button" onClick={() => fields.push({})}>{addText}</button>
        </li>
        <li>
            {fields.map((node, index) => (
                <li key={index}>
                    <button type="button" title={deleteText} onClick={() => fields.remove(index)}/>
                    <InnerComponent node={node} index={index}/>
                </li>
            ))}
        </li>
    </ul>
);

export default renderComponents;
