import React from 'react';
import express from 'express';
import proxy from 'express-http-proxy';
import { render } from '@jaredpalmer/after';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import qs from 'qs';
import routes from './routes';
import document from './Document';

import configureStore from './store/serverStore';
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const chunks = require(process.env.RAZZLE_CHUNKS_MANIFEST);

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .use('/api', proxy(process.env.RAZZLE_BASE_URL))
  .get('/*', async (req, res) => {
    try {
      const params = qs.parse(req.query);
      const counter = parseInt(params.counter, 10) || 0;
      const preloadedState = { counter };
      const store = configureStore(preloadedState);
      const serverState = store.getState();

      const customRenderer = (node) => {
        const App = <Provider store={store}>{node}</Provider>;
        return {
          html: renderToString(App),
          serverState,
        };
      };
      const html = await render({
        req,
        res,
        document,
        routes,
        assets,
        chunks,
        customRenderer,
      });
      res.send(html);
    } catch (error) {
      console.error(error);
      res.json({ message: error.message, stack: error.stack });
    }
  });

export default server;
