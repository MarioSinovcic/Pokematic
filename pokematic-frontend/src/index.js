import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./router/Routes";
import * as serviceWorker from "./serviceWorker";
import './index.css';
import { Provider } from 'react-redux';
import  { store,  persistor }   from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

console.log(store.getState());

const RouteWrapper = () => {
  return (
    <Provider store={store}>
      <Router>
        <PersistGate persistor={persistor}>
          <Routes />
        </PersistGate>
      </Router>
    </Provider>
  );
};

ReactDOM.render(<RouteWrapper />, document.getElementById("root"));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
