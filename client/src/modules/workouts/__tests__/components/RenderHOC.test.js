import React from 'react';
import { assertAddButtons, assertFields } from '../../../../util/testHelper';
import { Field } from 'redux-form';
import { shallow } from 'enzyme';
import renderComponents from '../../components/RenderHOC';
import renderField from '../../components/CustomFormElement';


describe('renderComponents HOC', () => {
  const props = {
      fields: {
        _fields: ['mocks[0]', 'mocks[1]'],
        map(callback) {
          return this._fields.map(callback);
        },
      },
    },
    Mock = ({ node, index }) =>
      <Field name={node} type="number" component={renderField} elem="input" label={`Mock #${index + 1}`} />,
    Mocks = renderComponents(Mock, 'Add Mock', 'Delete Mock'),
    wrapper = shallow(<Mocks {...props} />);

  it('should render properly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should have button for adding new Mock components', () => {
    assertAddButtons(wrapper, 'Add Mock');
  });

  it('should have Fields for rendering Mock components', () => {
    assertFields(wrapper, 0, 'mocks[0]', 'input', 'Mock #1', 'number', Mock);
    assertFields(wrapper, 1, 'mocks[1]', 'input', 'Mock #2', 'number', Mock);
  });

  it('should have a delete button to accompany Mock component', () => {
    const button = wrapper.find('button[title]');

    expect(button).toHaveLength(2);
    expect(button.everyWhere(n => n.props().title === 'Delete Mock')).toBe(true);
    expect(button.everyWhere(n => typeof n.props().onClick === 'function')).toBe(true);
  });
});
