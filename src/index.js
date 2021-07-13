import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './Home';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk"
import reducers from './Store/reducers';
import { Provider } from 'react-redux'

export const folderStore = createStore(
    reducers,
    {},
    applyMiddleware(thunk)
)



ReactDOM.render(
  <React.StrictMode>
    <Provider store={folderStore}>
        <Home />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
