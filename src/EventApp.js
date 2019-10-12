import React from 'react';
import FixedDataTableDemo from './components/FixedDataTable';
import './EventApp.css';
import Query from './components/Query';
import Results from './components/Results';

class EventApp extends React.Component {
  render() {
    return (
      <div>
        <Query />
        <Results >
          <FixedDataTableDemo/>
        </Results>
      </div>
    );
  }
}
export default EventApp