import { applyMiddleware, legacy_createStore } from 'redux';
import { reducer } from '../reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'

export const store = legacy_createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )

);