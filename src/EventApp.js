import React from 'react'
import ResultsTable from './components/ResultsTable'
import './EventApp.css'
import ChildrenButtonControl from './components/ChildrenButtonControl'
import QueryElements from './components/QueryElements'
import { Provider } from 'react-redux'
import store from './redux/store'

const EventApp = () =>
  <Provider store={store}>
    <ChildrenButtonControl name='Query'>
      <QueryElements />
    </ChildrenButtonControl>
    <ChildrenButtonControl name='Results'>
      <ResultsTable />
    </ChildrenButtonControl>
  </Provider>

  export default EventApp