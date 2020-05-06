import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import './assets/base.css';
//import App from './App';
import Main from './Pages/Main';
import * as serviceWorker from './serviceWorker';
import configureStore from './config/configureStore';
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
const store = configureStore();
const rootElement = document.getElementById('root');
const renderApp = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <HashRouter>
        <Component />
      </HashRouter>
    </Provider>,
    rootElement
  )
}
renderApp(Main);
serviceWorker.unregister();
