import actionTypes from '../actionTypes';
import moment from 'moment';

const {
    SET_EMAIL_FILTER,
    SET_COMPONENT_FILTER,
    SET_ENVIRONMENT_FILTER,
    SET_MESSAGE_FILTER,
    SET_ID_FILTER,
    SET_END_TIME_FILTER,
    SET_END_DATE_FILTER,
    SET_START_DATE_FILTER,
    SET_START_TIME_FILTER } = actionTypes;

const actionMap = {
    [SET_EMAIL_FILTER]: "email",
    [SET_COMPONENT_FILTER]: "component",
    [SET_ENVIRONMENT_FILTER]: "environment",
    [SET_MESSAGE_FILTER]: "message",
    [SET_ID_FILTER]: "id",
    [SET_END_DATE_FILTER]: "endDateControl",
    [SET_END_TIME_FILTER]: "endTimeControl",
    [SET_START_DATE_FILTER]: "startDateControl",
    [SET_START_TIME_FILTER]: "startTimeControl",
}

const initialState = {
    id: '',
    email: '',
    component: '',
    environment: '',
    message: '',
    startDateControl: null,
    endDateControl: null,
    startTimeControl: '',
    endTimeControl: '',
    startTime: '',
    endTime: '',
}

const mergeDateAndTime = (today, date, time) => {
    if (!date && !time) return ""
    var dateTimeMoment = (!date) ? today() : date
    if (time) {
        dateTimeMoment.hour(time.split(':')[0]).minutes(time.split(':')[1]).seconds(0).milliseconds(0)
    }
    return dateTimeMoment.format()
}

export default function (state = initialState, action) {
    var nextState
    switch (action.type) {
        case SET_EMAIL_FILTER:
        case SET_COMPONENT_FILTER:
        case SET_ENVIRONMENT_FILTER:
        case SET_MESSAGE_FILTER:
        case SET_ID_FILTER:
            return { ...state, [actionMap[action.type]]: action.payload.content }

        case SET_START_DATE_FILTER:
        case SET_START_TIME_FILTER:
            nextState = {
                ...state,
                [actionMap[action.type]]: action.payload.content,
            };
            nextState.startTime = mergeDateAndTime( () => moment().startOf("today"), nextState.startDateControl, nextState.startTimeControl)
            return nextState

        case SET_END_DATE_FILTER:
        case SET_END_TIME_FILTER:
            nextState = {
                ...state,
                [actionMap[action.type]]: action.payload.content,
            };
            nextState.endTime = mergeDateAndTime( () => moment.endOf("today"), nextState.endDateControl, nextState.endTimeControl)
            return nextState

        default:
            return state
    }
}