import React from 'react';
import 'react-dates/initialize';
import { connect } from 'react-redux'
import { DateRangePicker } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'
import 'moment'
import TimePicker from 'react-time-picker'
import { idFilter, 
         messageFilter,
         emailFilter,
         environmentFilter,
         componentFilter,
         startTimeFilter,
         endTimeFilter,
         startDateFilter,
         endDateFilter
         } from '../redux/eventActions'

class QueryElements extends React.Component {
    constructor(props) {
        super(props)
        this.state = { focusedInput: null }
    }

    render() {
        return (
            <form>
                Date Filter:
                    <DateRangePicker
                    startDate={this.props.startDateControl} // momentPropTypes.momentObj or null,
                    startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                    endDate={this.props.endDateControl} // momentPropTypes.momentObj or null,
                    endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                    onDatesChange={({ startDate, endDate }) => {
                        this.props.startDateFilter(startDate)
                        this.props.endDateFilter(endDate)
                    }}
                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                    isOutsideRange={day => false} />
                <div>
                    Time Filter:
                    <span>Start<TimePicker onChange={this.props.startTimeFilter} value={this.props.startTimeControl} /></span>
                    <span>End:<TimePicker onChange={this.props.endTimeFilter} value={this.props.endTimeControl} /></span>
                </div>
                <div>Id: <input type='text' value={this.props.id} onChange={this.props.idFilter} /></div>
                <div>Email: <input type='text' value={this.props.email} onChange={this.props.emailFilter}></input></div>
                <div>Environment: <input type='text' value={this.props.environment} onChange={this.props.environmentFilter}></input></div>
                <div>Component: <input type='text' value={this.props.component} onChange={this.props.componentFilter}></input></div>
                <div>Message: <input type='text' value={this.props.message} onChange={this.props.messageFilter}></input></div>
            </form>
        )
    }
}

export default connect(
    state => state.queryValues, 
    { 
        idFilter, 
        emailFilter, 
        environmentFilter, 
        componentFilter,
        messageFilter,
        startDateFilter,
        endDateFilter,
        startTimeFilter,
        endTimeFilter
    }
)(QueryElements);