import React from 'react';
import ReactDOM from 'react-dom';
import NewProject from './NewProject';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NewProject />, div);
  ReactDOM.unmountComponentAtNode(div);
});
