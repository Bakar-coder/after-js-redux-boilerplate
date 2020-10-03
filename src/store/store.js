import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import Axios from 'axios';

const axiosInstance = Axios.create({
  baseURL: '/api',
});
const composer =
  process.env.NODE_ENV !== 'production'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

const configureStore = (preloadedState) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    composer(applyMiddleware(thunk.withExtraArgument(axiosInstance))),
  );

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
