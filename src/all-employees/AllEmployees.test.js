import React from 'react';
import ReactDOM from 'react-dom';
import AllEmployees from './AllEmployees';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AllEmployees />, div);
  ReactDOM.unmountComponentAtNode(div);
});
