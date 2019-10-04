import React from 'react';
import { Table, Column, Cell } from 'fixed-data-table-2';
import 'fixed-data-table-2/dist/fixed-data-table.css';

class FixedDataTableDemo extends React.Component {

  getData = (row, column) =>
    (this.props.data && typeof this.props.data[row][column] !== 'undefined') ? this.props.data[row][column] : "No data"

  render() {
    if (this.props.data == null) return (<div />)
    else {
      return (<Table
        rowHeight={50}
        rowsCount={this.props.data.length}
        width={1000}
        height={500}
        headerHeight={50}>
        <Column
          header={<Cell>Id</Cell>}
          columnKey='Id'
          cell={({ rowIndex, columnKey, ...props }) => (
            <Cell {...props}>
              {this.getData(rowIndex, columnKey)}
            </Cell>
          )}
          width={200}
        />
        <Column
          header={<Cell>CreatedAt</Cell>}
          columnKey='CreatedAt'
          cell={({ rowIndex, columnKey, ...props }) => (
            <Cell {...props}>
              {this.getData(rowIndex, columnKey)}
            </Cell>
          )}
          width={200}
        />
        <Column
          header={<Cell>Email</Cell>}
          columnKey='Email'
          cell={({ rowIndex, columnKey, ...props }) => (
            <Cell {...props}>
              {this.getData(rowIndex, columnKey)}
            </Cell>
          )}
          width={200}
        />
        <Column
          header={<Cell>Component</Cell>}
          columnKey='Component'
          cell={({ rowIndex, columnKey, ...props }) => (
            <Cell {...props}>
              {this.getData(rowIndex, columnKey)}
            </Cell>
          )}
          width={200}
        />
        <Column
          header={<Cell>Environment</Cell>}
          columnKey='Environment'
          cell={({ rowIndex, columnKey, ...props }) => (
            <Cell {...props}>
              {this.getData(rowIndex, columnKey)}
            </Cell>
          )}
          width={200}
        />
        <Column
          header={<Cell>Message</Cell>}
          columnKey='Message'
          cell={({ rowIndex, columnKey, ...props }) => (
            <Cell {...props}>
              {this.getData(rowIndex, columnKey)}
            </Cell>
          )}
          width={200}
        />
        <Column
          header={<Cell>Data</Cell>}
          columnKey='Data'
          cell={({ rowIndex, columnKey, ...props }) => (
            <Cell {...props}>
              {this.getData(rowIndex, columnKey)}
            </Cell>
          )}
          width={200}
        />
      </Table>)
    }
  }
}

export default FixedDataTableDemo;