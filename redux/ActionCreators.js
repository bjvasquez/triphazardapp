import * as ActionTypes from './ActionTypes';

export const loginFailed = errMess => ({
    type: ActionTypes.LOGIN_FAILED,
    payload: errMess
});

export const loginSuccess = user => ({
    type: ActionTypes.LOGIN_SUCCESS,
    payload: user
});