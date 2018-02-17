// Core
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

// Instruments
import './theme/reset.css';
import rootReducer from './reducers';

// App
import App from './containers/App';

const middleware = [logger, thunk];

const store = createStore(
    rootReducer,
    applyMiddleware(...middleware),
);

render(
    <Provider store = { store }>
        <App />
    </Provider>,
    document.getElementById('root')
);
