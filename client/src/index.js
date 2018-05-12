import React from 'react';
import { render } from 'react-dom';
import { Routes } from './routes';
import store from './store/configureStore';
import './index.css';


render(<Routes store={store} />, document.getElementById('root'));
