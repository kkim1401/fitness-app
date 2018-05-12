import React from 'react';
import { shallow } from 'enzyme';
import { NavLink } from 'react-router-dom';
import Page from '../../components/Page';
import { NAME as usersNAME } from '../../constants';

describe('Page component', () => {
  it('renders correctly', () => {
    let wrapper = shallow(<Page link="/exercises" children="Exercises" />),
      props = wrapper.props();

    expect(wrapper.type()).toEqual(NavLink);
    expect(props.activeClassName).toEqual('active');
    expect(props.className).toEqual('link');
    expect(props.exact).toEqual(false);
    expect(props.to).toEqual('/exercises');
    expect(props.children).toEqual('Exercises');

    // if link is root
    wrapper = shallow(<Page link="/" />);
    props = wrapper.props();

    expect(props.exact).toEqual(true);
  });
});
