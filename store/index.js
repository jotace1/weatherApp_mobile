import { createStore, combineReducers } from 'redux';

import citiesReducer from './ducks/cities';

const rootReducer = combineReducers({
  city: citiesReducer,
});

const store = createStore(rootReducer);

export default store;
