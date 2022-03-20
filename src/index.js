import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import './index.css'
import 'font-awesome/css/font-awesome.min.css';
import { createStore } from "redux";
import { Provider } from "react-redux";
import allReducers from "./reducers";

const store = createStore(allReducers);
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  
  document.getElementById('root')
);


