import React from 'react';

const renderComponents = (InnerComponent, addText, deleteText) => (props) => {
  const { fields, ...restOfProps } = props;

  return (
    <div>
      <button type="button" onClick={() => fields.push({})}>{addText}</button>
      <ul>
        {fields.map((node, index) => (
          <li key={index}>
            <button type="button" title={deleteText} onClick={() => fields.remove(index)} />
            <InnerComponent node={node} index={index} {...restOfProps} />
          </li>
                ))}
      </ul>
    </div>
  );
};

export default renderComponents;
