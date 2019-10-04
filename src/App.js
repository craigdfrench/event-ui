import React from 'react';
import FixedDataTableDemo from './FixedDataTable';
import './App.css';
import Query from './Query';
import Results from './Results';
import { stringify } from 'query-string';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { queryResults: null }
  }

  responseReceiver = result => this.setState({ queryResults: result })

  handleQuery = queryVariables => fetch(`http://localhost:8080/event?${stringify(queryVariables)}`, {  mode: 'cors'})
    .then(resp => resp.json())
    .then(this.responseReceiver)

  queryReceiver = queryVariables => this.handleQuery(queryVariables)

  render() {
    return (
      <div>
        <Query onQuery={this.queryReceiver} />
        <Results >
          <FixedDataTableDemo data={this.state.queryResults}></FixedDataTableDemo>
        </Results>
      </div>
    );
  }
}

export default App;
