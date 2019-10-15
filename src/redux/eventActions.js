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
      console.log('response not ok',response.statusText)
        throw Error(response.statusText);
    }
    return response;
}

export const fetchEventsBegin = () => ({
  type: FETCH_EVENTS_BEGIN
});

export const fetchEventsSuccess = events => ({
  type: FETCH_EVENTS_SUCCESS,
  payload: {contents: events}
});

export const fetchEventsFailure = error => ({
  type: FETCH_EVENTS_FAILURE,
  payload: { error: error }
});

export const messageFilter = event => ({ 
  type: actionTypes.SET_MESSAGE_FILTER,
  payload: { contents: event.target.value }
})

export const idFilter = event => ({ 
  type: actionTypes.SET_ID_FILTER,
  payload: { contents: event.target.value }
})

export const componentFilter = event => ({ 
  type: actionTypes.SET_COMPONENT_FILTER,
  payload: { contents: event.target.value }
})

export const emailFilter = event => ({ 
  type: actionTypes.SET_EMAIL_FILTER,
  payload: { contents: event.target.value }
})

export const environmentFilter = event => ({ 
  type: actionTypes.SET_ENVIRONMENT_FILTER,
  payload: { contents: event.target.value }
})

export const startTimeFilter = time => ({ 
  type: actionTypes.SET_START_TIME_FILTER,
  payload: {contents: time }
})

export const endTimeFilter = time => ({ 
  type: actionTypes.SET_END_TIME_FILTER,
  payload: {contents: time }
})

export const startDateFilter = date => ({ 
  type: actionTypes.SET_START_DATE_FILTER,
  payload: { contents: date }
})

export const endDateFilter = date => ({ 
  type: actionTypes.SET_END_DATE_FILTER,
  payload: { contents: date }
})
