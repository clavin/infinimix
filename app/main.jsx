import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './components/App';

/**
 * Renders the app. This is a function to support hot module replacement.
 * @param {React.Component|function} Component - Component to render.
 * @returns {void}
 */
function render(Component) {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('app')
  );
}

// Render the app, and (if applicable) register hot module replacement for the app too.
render(App);
if (module.hot)
  module.hot.accept('./components/App', () => render(require('./components/App').default));
