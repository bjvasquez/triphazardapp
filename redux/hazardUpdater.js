import * as ActionTypes from './ActionTypes';
import {Hazards} from '../shared/hazards';

export const hazardUpdater = (state = {hazards:Hazards}, action) => {
    switch (action.type) {
        case ActionTypes.NEW_HAZARD:
            return ({
                hazards: state.hazards.concat(action.payload)
            });
        default:
          return state;
      }
};