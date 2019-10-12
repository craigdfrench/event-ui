import React from 'react';
import ReactDOM from 'react-dom';
import EventApp from './EventApp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EventApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
