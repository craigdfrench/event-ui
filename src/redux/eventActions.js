import { stringify } from 'query-string';
import actionTypes from './actionTypes';
import _ from 'lodash';

const {
  FETCH_EVENTS_BEGIN,
  FETCH_EVENTS_FAILURE,
  FETCH_EVENTS_SUCCESS,
} = actionTypes

export function fetchEvents(queryVariables) {
    return dispatch => {
        var query = _.pick(queryVariables,[ 'component','email', 'endTime', 'environment', 'id', 'message', 'startTime'])
        dispatch(fetchEventsBegin());
        return fetch(`http://localhost:8080/event?${stringify(query)}`, { mode: 'cors' })
            .then(handleErrors)
            .then(res => res.json())
            .then(result => {
                dispatch(fetchEventsSuccess(result));
                return result;
            })
            .catch(error => dispatch(fetchEventsFailure(error)));
    };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export const fetchEventsBegin = () => ({
  type: FETCH_EVENTS_BEGIN
});

export const fetchEventsSuccess = events => ({
  type: FETCH_EVENTS_SUCCESS,
  payload: { events }
});

export const fetchEventsFailure = error => ({
  type: FETCH_EVENTS_FAILURE,
  payload: { error }
});