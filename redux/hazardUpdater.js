import * as ActionTypes from './ActionTypes';
import {HAZARDS} from '../shared/hazards';

export const hazardUpdater = (state = {hazards:HAZARDS, numberOfHazards:2}, action) => {
    switch (action.type) {
        case ActionTypes.NEW_HAZARD:
            return ({
                ...state,hazards: state.hazards.concat(action.payload)
            });
        default:
          return state;
      }
};