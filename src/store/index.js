import { applyMiddleware, legacy_createStore } from 'redux';
import { reducer } from '../reducers';
import thunk from 'redux-thunk';

export const store = legacy_createStore(
    reducer,
    applyMiddleware(thunk)
);