import React from 'react';
import ReactDOM from 'react-dom';
import Route from './routers/router';
import * as serviceWorker from './serviceWorker';
import 'antd-mobile/dist/antd-mobile.css';
import './style/base.scss'

const render = Component => {
ReactDOM.render(
    <Component />,
  document.getElementById('root')
)
}
render (Route);

serviceWorker.unregister();
