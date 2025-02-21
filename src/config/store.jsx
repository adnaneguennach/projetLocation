import { createStore, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk';
import reducerFunction from './reducer'; // Your reducer

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducerFunction,
  composeEnhancers(applyMiddleware(thunk)) 
);

export default store;
