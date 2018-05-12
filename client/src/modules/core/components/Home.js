import React from 'react';
import users from '../../users';

const { withTemplate } = users.components;

const Home = () => (
  <div>
    <h1>Welcome!</h1>
  </div>
);

export default withTemplate(Home);
