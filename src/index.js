import React from 'react';
import ReactDOM from 'react-dom';
import Route from './routers/router';
import * as serviceWorker from './serviceWorker';
import './style/base.scss';
import { Provider } from "mobx-react";
import stores from "./store/store";

ReactDOM.render(
  <Provider {...stores}>
    <Route/>
  </Provider>,
  document.getElementById('root')
)


serviceWorker.unregister();
