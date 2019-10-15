import actionTypes from './actionTypes';
import _ from 'lodash';
import * as actions from './eventActions'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const joiner = (strings) => strings[0].split('\n').map(val => val.trim()).join('')

const urlString = joiner`http://localhost:8080/event?
  component=inventory&
  email=craig%40thefrenches.ca&
  endTime=2006-01-02T15%3A04%3A05-07%3A00&
  environment=prod&
  id=b91d4300-5f60-45fa-91e2-99c8672ab3d6&
  message=hi%20there&
  startTime=2006-01-02T15%3A04%3A05-07%3A00`;

const myTestLog = {
  component: 'inventory',
  email: 'craig@thefrenches.ca',
  endTime: '2006-01-02T15:04:05-07:00',
  environment: 'prod',
  id: 'b91d4300-5f60-45fa-91e2-99c8672ab3d6',
  message: 'hi there',
  startTime: '2006-01-02T15:04:05-07:00'
}

describe('async actions', () => {

  afterEach(() => {
    fetchMock.restore()
  })

  it('creates FETCH_EVENTS_SUCCESS when fetching events has been done', () => {

    fetchMock.getOnce(
      urlString, {
      body: [myTestLog, myTestLog],
      headers: { 'content-type': 'application/json' }
    })

    const expectedActions = [
      { type: actionTypes.FETCH_EVENTS_BEGIN },
      {
        type: actionTypes.FETCH_EVENTS_SUCCESS,
        payload: {contents: [myTestLog, myTestLog] }
      }
    ]
    const store = mockStore({ event: [] })

    return store.dispatch(actions.fetchEvents(myTestLog)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('creates FETCH_EVENTS_FAILURE when fetching events fails 404', () => {

    fetchMock.getOnce(
      urlString, {
      status: 404,
    })

    const expectedActions = [
      { type: actionTypes.FETCH_EVENTS_BEGIN },
      {
        type: actionTypes.FETCH_EVENTS_FAILURE,
        payload: { error: Error('Not Found') }
      }
    ]
    const store = mockStore({ event: [] })

    return store.dispatch(actions.fetchEvents(myTestLog)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

})
describe('sync actions', () => {
  it('creates FETCH_EVENTS_BEGIN when fetchEventsBegin called', () => {
    const expectedAction = {
      type: actionTypes.FETCH_EVENTS_BEGIN
    }
    expect(actions.fetchEventsBegin()).toEqual(expectedAction)
  })

  it('creates FETCH_EVENTS_FAILURE when fetchEventsBegin called', () => {
    const expectedAction = {
      type: actionTypes.FETCH_EVENTS_FAILURE,
      payload: { error: Error('test error') }
    }
    expect(actions.fetchEventsFailure(Error("test error"))).toEqual(expectedAction)
  })

  it('creates FETCH_EVENTS_SUCCESS when fetchEventsSuccess is called', () => { 
    const expectedAction = {
      type: actionTypes.FETCH_EVENTS_SUCCESS,
      payload: { contents: [ myTestLog ] }
    }
    expect(actions.fetchEventsSuccess([myTestLog])).toEqual(expectedAction)
  })

  it('creates SET_COMPONENT_FILTER when componentFilter is called', () => {
    const { component : filterString } = myTestLog
    const expectedAction = {
      type: actionTypes.SET_COMPONENT_FILTER,
      payload: { contents: filterString }
    }
    expect(actions.componentFilter({ target: {value: filterString } } )).toEqual(expectedAction)   
  })

  it('creates SET_MESSAGE_FILTER when messageFilter is called', () => {
    const { message : filterString } = myTestLog
    const expectedAction = {
      type: actionTypes.SET_MESSAGE_FILTER,
      payload: {contents: filterString }
    }
    expect(actions.messageFilter({ target: {value: filterString } } )).toEqual(expectedAction)   
  })

  it('creates SET_EMAIL_FILTER when emailFilter is called', () => {
    const { email : filterString } = myTestLog
    const expectedAction = {
      type: actionTypes.SET_EMAIL_FILTER,
      payload: {contents: filterString }
    }
    expect(actions.emailFilter({ target: {value: filterString } } )).toEqual(expectedAction)   
  })

  it('creates SET_ENVIRONMENT_FILTER when environmentFilter is called', () => {
    const { environment : filterString } = myTestLog
    const expectedAction = {
      type: actionTypes.SET_ENVIRONMENT_FILTER,
      payload: { contents: filterString }
    }
    expect(actions.environmentFilter({ target: {value: filterString } } )).toEqual(expectedAction)   
  })

  it('creates SET_ID_FILTER when idFilter is called', () => {
    const { id : filterString } = myTestLog
    const expectedAction = {
      type: actionTypes.SET_ID_FILTER,
      payload: {contents: filterString }
    }
    expect(actions.idFilter({ target: {value: filterString } } )).toEqual(expectedAction)   
  })

  it('creates SET_START_TIME_FILTER when startTimeFilter is called', () => {
    const { createdAt : filterString } = myTestLog
    const expectedAction = {
      type: actionTypes.SET_START_TIME_FILTER,
      payload: {contents: filterString }
    }
    expect(actions.startTimeFilter(filterString)).toEqual(expectedAction)   
  })

  it('creates SET_END_TIME_FILTER when endTimeFilter is called', () => {
    const { createdAt : filterString } = myTestLog
    const expectedAction = {
      type: actionTypes.SET_END_TIME_FILTER,
      payload: { contents: filterString }
    }
    expect(actions.endTimeFilter(filterString)).toEqual(expectedAction)   
  })

  it('creates SET_START_DATE_FILTER when startDateFilter is called', () => {
    const { createdAt : filterString } = myTestLog
    const expectedAction = {
      type: actionTypes.SET_START_DATE_FILTER,
      payload: {contents: filterString }
    }
    expect(actions.startDateFilter(filterString)).toEqual(expectedAction)   
  })

  it('creates SET_END_DATE_FILTER when endDateFilter is called', () => {
    const { createdAt : filterString } = myTestLog
    const expectedAction = {
      type: actionTypes.SET_END_DATE_FILTER,
      payload: { contents: filterString }
    }
    expect(actions.endDateFilter(filterString)).toEqual(expectedAction)   
  })

})