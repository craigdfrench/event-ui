import React from 'react';
import 'react-dates/initialize';
import { connect } from 'react-redux'
import { DateRangePicker } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'
import './QueryElements.css'
import 'moment'
import TimePicker from 'react-time-picker'
import {
    idFilter,
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
        const { startTimeFilter, endTimeFilter, startDateFilter, endDateFilter, idFilter, emailFilter, environmentFilter, componentFilter, messageFilter } = this.props
        const { startTimeControl, endTimeControl, startDateControl, endDateControl, id, email, environment, component, message } = this.props
        return (
            <div className="QueryElements-form">
                <form>
                    <label>Date Filter:</label><br />
                    <DateRangePicker
                        startDate={startDateControl} // momentPropTypes.momentObj or null,
                        startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                        endDate={endDateControl} // momentPropTypes.momentObj or null,
                        endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                        onDatesChange={({ startDate, endDate }) => {
                            startDateFilter(startDate)
                            endDateFilter(endDate)
                        }}
                        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                        onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                        isOutsideRange={day => false} /><br />
                    <label>Time Filter:</label><br />
                    <span className="TimeFilter">
                        <TimePicker clockIcon={null} onChange={startTimeFilter} value={startTimeControl} />
                        <TimePicker clockIcon={null} onChange={endTimeFilter} value={endTimeControl} />
                    </span><br />
                    <label>Id:</label><input type='text' value={id} onChange={idFilter} /><br />
                    <label>Email:</label><input type='text' value={email} onChange={emailFilter} /><br />
                    <label>Environment:</label><input type='text' value={environment} onChange={environmentFilter} /><br />
                    <label>Component:</label><input type='text' value={component} onChange={componentFilter} /><br />
                    <label>Message:</label><input type='text' value={message} onChange={messageFilter} /><br />
                </form>
            </div>
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