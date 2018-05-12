import React from 'react';
import { shallow } from 'enzyme';
import { ExerciseInstance, mapStateToProps } from '../../components/ExerciseInstance';
import { assertFields } from '../../../../util/testHelper';
import e from '../../../exercises';
import { Field } from 'redux-form';

const { MOCK_EXERCISE1, MOCK_EXERCISE2, NAME: exercisesNAME } = e.constants;


describe('ExerciseInstance component', () => {
  const props = {
      exercises: [MOCK_EXERCISE1, MOCK_EXERCISE2],
      node: 'schedule.weeks[0].days[0].exerciseInstances[0]',
      index: 0,
    },
    wrapper = shallow(<ExerciseInstance {...props} />);

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should have a Field for rendering input for order', () => {
    assertFields(wrapper, 0, 'schedule.weeks[0].days[0].exerciseInstances[0].order', 'input', 'Order', 'number');
  });

  it('has select tag and options for list of exercises to pick from', () => {
    assertFields(wrapper, 1, 'schedule.weeks[0].days[0].exerciseInstances[0].exercises', 'select', 'Exercise');
    expect(wrapper.find('option').at(0).text()).toBe(props.exercises[0].name);
    expect(wrapper.find('option').at(1).text()).toBe(props.exercises[1].name);
  });

  it('should have a Field for rendering input for number of sets', () => {
    assertFields(wrapper, 2, 'schedule.weeks[0].days[0].exerciseInstances[0].setNumber', 'input', 'Number of sets', 'number');
  });

  it('should have a Field for rendering input for number of reps', () => {
    assertFields(wrapper, 3, 'schedule.weeks[0].days[0].exerciseInstances[0].reps', 'input', 'Number of reps', 'number');
  });

  it('should have a Field for rendering input for weight to use', () => {
    assertFields(wrapper, 4, 'schedule.weeks[0].days[0].exerciseInstances[0].weight', 'input', 'Weight', 'number');
  });
});

describe('ExerciseInstance container', () => {
  it('mapStateToProps returns correct props', () => {
    expect(mapStateToProps({ [exercisesNAME]: [MOCK_EXERCISE1, MOCK_EXERCISE2] })).toEqual({ exercises: [MOCK_EXERCISE1, MOCK_EXERCISE2] });
  });
});
