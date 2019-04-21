import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './App.scss';
import './index.css';
import "antd/dist/antd.css";

import $ from "jquery"
window.$ = $;

ReactDOM.render(<App />, document.getElementById('root'));