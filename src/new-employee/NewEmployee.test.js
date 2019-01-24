import React from 'react';
import ReactDOM from 'react-dom';
import NewEmployee from './NewEmployee';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NewEmployee />, div);
  ReactDOM.unmountComponentAtNode(div);
});
