import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';

import 'owl.carousel2/dist/assets/owl.carousel.css';
import 'node_modules/owl.carousel/node_modules/jquery';


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
