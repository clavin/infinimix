import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';

import './style/global';

// This file pretty much exists solely to put the rest of the application into the magical land of React.
// Simultaneously, this is a generally good place to put overarching components, like the Router.

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('app')
);
