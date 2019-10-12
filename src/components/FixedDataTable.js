import React from 'react';
import { connect } from 'react-redux';
import { Table, Column, Cell } from 'fixed-data-table-2';
import _ from 'lodash';
import 'fixed-data-table-2/dist/fixed-data-table.css';
import { fetchEvents } from "../redux/eventActions"

class FixedDataTableDemo extends React.Component {

  componentDidMount() {
    const { dispatch, queryValues } = this.props
    dispatch(fetchEvents(queryValues))
  }

  componentDidUpdate(prevProps) {
    const { dispatch, queryValues } = this.props
    if (!_.isEqual(prevProps.queryValues, this.props.queryValues)) {
      dispatch(fetchEvents(queryValues))
    }
  }

  getData = (row, column) =>
    (this.props.eventResults.items && typeof this.props.eventResults.items[row][column] !== 'undefined') ? this.props.eventResults.items[row][column] : "No data"

  render() {
    if (this.props.eventResults.error) return (<div> Error: {this.props.errror} </div>)
    if (this.props.eventResults.loading) return (<div> Loading...</div>)
    if (this.props.eventResults.items == null) return (<div>No Data</div>)
    else {
      return (<Table
        rowHeight={50}
        rowsCount={this.props.eventResults.items.length}
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

export default connect(state => state)(FixedDataTableDemo)