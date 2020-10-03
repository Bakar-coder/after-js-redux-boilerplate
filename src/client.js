import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store/store';
import { ensureReady, After } from '@jaredpalmer/after';
import './client.scss';
import routes from './routes';

const store = configureStore(window.__PRELOADED_STATE__);

ensureReady(routes).then((data) =>
  hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <After data={data} routes={routes} />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
  ),
);

if (module.hot) {
  module.hot.accept();
}
