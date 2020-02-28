import * as ActionTypes from './ActionTypes';
import React, {useEffect} from 'react';
import {HAZARDS} from '../shared/hazards';  






export const hazardUpdater = (state = {hazards:HAZARDS, numberOfHazards: HAZARDS.length}, action) => {
    switch (action.type) {
        case ActionTypes.NEW_HAZARD:
            alert('new hazard called in hazardUpdater, number of hazards = ' + action.payload.length)
            return ({
                ...state,hazards: state.hazards.concat(action.payload)
            });
        case ActionTypes.UPDATE_HAZARDS:
            alert('hazard Updater called with ' + action.payload.length + ' hazards');
        return ({
            numberOfHazards: action.payload.length, 
            hazards: action.payload
        });
        default:
          return state;
      }
};