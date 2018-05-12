import React from 'react';
import { shallowWithStore, createMockStore } from '../../../../util/testHelper';
import { WorkoutCreationFormContainer } from '../../components/WorkoutCreationFormContainer';

describe('WorkoutCreationFormContainer', () => {
  const store = createMockStore();
  const mockFunction = jest.fn();
  const props = {
    handleFormSubmit(args) {
      mockFunction(args);
    },
    values: {
      data: 'Mock Values',
    },
  };
  const wrapper = shallowWithStore(WorkoutCreationFormContainer, store, props);

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('has onSubmit prop', () => {
    expect(typeof wrapper.props().onSubmit).toBe('function');
  });

  it('onSubmit calls handleFormSubmit', () => {
    wrapper.props().onSubmit(props.values);

    expect(mockFunction.mock.calls.length).toBe(1);
    expect(mockFunction.mock.calls[0][0]).toBe(props.values);
  });
});

describe('mapDispatchToFunction', () => {});
