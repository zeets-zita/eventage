import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import eventReducer from './eventReducer';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  event: eventReducer
});
