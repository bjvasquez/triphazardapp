import * as ActionTypes from './ActionTypes';
import {USERS} from '../shared/users';

export const loginUpdater = (state = {loggedIn: false, user: {}, users: USERS}, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_SUCCESS:
            return ({
                ...state,
                loggedIn: true,
                user: action.payload,
                
            });


        case ActionTypes.LOGIN_FAILED:
            return {...state, 
            loggedIn: false}

        default:
          return state;
      }
};