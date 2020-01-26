import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {loginUpdater} from './loginUpdater';
import {hazardUpdater} from './hazardUpdater';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            loginUpdater:loginUpdater,
            hazards:hazardUpdater
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}