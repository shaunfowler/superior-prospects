import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Property from './Property';

const mockStore = configureStore([thunk]);

it('renders without crashing', () => {
  const initialState = {};
  const initialProps = {
    match: { params: {} },
    properties: { list: [{ id: 1234 }] },
    getProperties: () => Promise.resolve([])
  };
  const store = mockStore(initialState);
  const div = document.createElement('div');
  ReactDOM.render(<Property store={store} {...initialProps} />, div);
});
