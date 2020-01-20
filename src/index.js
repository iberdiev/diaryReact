import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import '../node_modules/mtr-datepicker/dist/mtr-datepicker.default-theme.min.css';
import '../node_modules/mtr-datepicker/dist/mtr-datepicker.min.css';
import '../node_modules/mtr-datepicker/dist/mtr-datepicker.min.js';





ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

