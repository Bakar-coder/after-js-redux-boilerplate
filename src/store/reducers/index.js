import { combineReducers } from 'redux';
import auth from './authReducer';
import counter from './counter';

export default combineReducers({
  auth,
  counter,
});
