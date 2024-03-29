import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import './index.css'
import { Provider } from 'react-redux';
import store from './redux/store/store';
import 'font-awesome/css/font-awesome.min.css';
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);