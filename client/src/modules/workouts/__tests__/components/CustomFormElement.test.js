import React from 'react';
import { shallow, mount } from 'enzyme';
import renderField from '../../components/CustomFormElement';

describe('CustomFormElement returned component', () => {
  let props = {
      input: {},
      elem: 'input',
      label: 'MockLabel',
      type: 'number',
      meta: {
        touched: false,
        error: '',
      },
    },
    CustomInput = renderField,
    inputWrapper = mount(<CustomInput {...props} />);


  it('renders properly', () => {
    expect(inputWrapper.exists()).toBe(true);
  });

  it('should have label with appropriate text', () => {
    expect(inputWrapper.find('label').text()).toBe(props.label);
  });

  it('should have input with appropriate type', () => {
    expect(inputWrapper.find('input').props().type).toBe(props.type);
  });

  it('should not have error shown', () => {
    expect(inputWrapper.find('span').exists()).toBe(false);
  });

  it('should have select instead of input for selectWrapper', () => {
    const selectWrapper = mount(<CustomInput {...props} elem="select" />);
    expect(selectWrapper.find('select').exists()).toBe(true);
    expect(selectWrapper.find('select').props().type).toBe(undefined);
    expect(selectWrapper.find('input').exists()).toBe(false);
  });

  it('should not have error shown until both touched is true and error prop is a non-empty string', () => {
    inputWrapper = mount(<CustomInput {...props} meta={{ touched: true, error: '' }} />);
    expect(inputWrapper.find('span').exists()).toBe(false);

    inputWrapper = mount(<CustomInput {...props} meta={{ touched: true, error: 'Something went wrong' }} />);
    expect(inputWrapper.find('span').text()).toBe('Something went wrong');
  });
});
