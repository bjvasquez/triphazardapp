import * as ActionTypes from './ActionTypes';
import {USERS} from '../shared/users';

export const loginUpdater = (state = {loggedIn: false, user: {}, users: USERS}, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_SUCCESS:
            return ({
                loggedIn: true,
                user: action.payload,
                users:USERS
            });


        case ActionTypes.LOGIN_FAILED:
            return {...state}

        default:
          return state;
      }
};