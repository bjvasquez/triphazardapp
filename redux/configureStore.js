import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {loginUpdater} from './loginUpdater';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            loginUpdater
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}