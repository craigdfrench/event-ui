import React from 'react';
import ReactDOM from 'react-dom';
import {Table, Column, Cell} from 'fixed-data-table-2';
import 'fixed-data-table-2/dist/fixed-data-table.css';

var rows = []

function getJSONData() {
    fetch("http://localhost:8080/event")
    .then(resp => resp.json())
    .then(data => {
        console.log(data);
        rows = data;
        ReactDOM.render(<FixedDataTableDemo/>, document.getElementById('root'));
    })
}

getJSONData();

const FixedDataTableDemo = () => 
  <Table
    rowHeight={50}
    rowsCount={rows.length}
    width={500}
    height={500}
    headerHeight={50}>
    <Column
      header={<Cell>Id</Cell>}
      columnKey = 'Id'
      cell={({rowIndex, columnKey, ...props}) => (
        <Cell {...props}>
          {rows[rowIndex][columnKey]}
        </Cell>
      )}
      width={200}
    />
    <Column
      header={<Cell>Email</Cell>}
      columnKey = 'Email'
      cell={({rowIndex, columnKey, ...props}) => (
        <Cell {...props}>
          {rows[rowIndex][columnKey]}
        </Cell>
      )}
      width={200}
    />
    <Column
      header={<Cell>Component</Cell>}
      columnKey = 'Component'
      cell={({rowIndex, columnKey, ...props}) => (
        <Cell {...props}>
          {rows[rowIndex][columnKey]}
        </Cell>
      )}
      width={200}
    />
    <Column
      header={<Cell>Environment</Cell>}
      columnKey = 'Environment'
      cell={({rowIndex, columnKey, ...props}) => (
        <Cell {...props}>
          {rows[rowIndex][columnKey]}
        </Cell>
      )}
      width={200}
    />
    <Column
      header={<Cell>Message</Cell>}
      columnKey = 'Message'
      cell={({rowIndex, columnKey, ...props}) => (
        <Cell {...props}>
          {rows[rowIndex][columnKey]}
        </Cell>
      )}
      width={200}
    />
    <Column
      header={<Cell>Data</Cell>}
      columnKey = 'Data'
      cell={({rowIndex, columnKey, ...props}) => (
        <Cell {...props}>
          {rows[rowIndex][columnKey]}
        </Cell>
      )}
      width={200}
    />
  </Table> 

export default FixedDataTableDemo;