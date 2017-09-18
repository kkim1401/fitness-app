import React from "react";

const renderField  = ({input, label, type = "", elem, meta: {touched, error}}) => (
    <div>
        <label>
            {label}
        </label>
        <div>
            {React.createElement(elem, elem === "input" ? {...input, type} : {...input})}
            {touched &&
            error &&
            <span>
          {error}
        </span>}
        </div>
    </div>
);

export default renderField;