import React from 'react';
import 'react-dates/initialize';
import { connect } from 'react-redux'
import { DateRangePicker } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'
import 'moment'
import TimePicker from 'react-time-picker'

import actionTypes from '../redux/actionTypes'
import { setFilter } from '../redux/action'

class QueryElements extends React.Component {
    constructor(props) {
        super(props)
        this.state = { focusedInput: null }
    }

    onChange = event => {
        switch (event.target.name) {
            case "email":
                this.props.setFilter(actionTypes.SET_EMAIL_FILTER, event.target.value)
                break
            case "component":
                this.props.setFilter(actionTypes.SET_COMPONENT_FILTER, event.target.value)
                break
            case "environment":
                this.props.setFilter(actionTypes.SET_ENVIRONMENT_FILTER, event.target.value)
                break
            case "message":
                this.props.setFilter(actionTypes.SET_MESSAGE_FILTER, event.target.value)
                break
            case "id":
                this.props.setFilter(actionTypes.SET_ID_FILTER, event.target.value)
                break
            default:
                break
        }
    }

    startTimeUpdate = time => {
        this.props.setFilter(actionTypes.SET_START_TIME_FILTER, time)
    }
    endTimeUpdate = time => {
        this.props.setFilter(actionTypes.SET_END_TIME_FILTER, time)
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
                        this.props.setFilter(actionTypes.SET_START_DATE_FILTER, startDate)
                        this.props.setFilter(actionTypes.SET_END_DATE_FILTER, endDate)
                    }}
                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                    isOutsideRange={day => false} />
                <div>
                    Time Filter:
                        <span>Start<TimePicker onChange={this.startTimeUpdate} value={this.props.startTimeControl} /></span>
                    <span>End:<TimePicker onChange={this.endTimeUpdate} value={this.props.endTimeControl} /></span>
                </div>
                <div>Id: <input type='text' name='id' value={this.props.id} onChange={this.onChange} /></div>
                <div>Email: <input type='text' name='email' value={this.props.email} onChange={this.onChange}></input></div>
                <div>Environment: <input type='text' name='environment' value={this.props.environment} onChange={this.onChange}></input></div>
                <div>Component: <input type='text' name='component' value={this.props.component} onChange={this.onChange}></input></div>
                <div>Message: <input type='text' name='message' value={this.props.message} onChange={this.onChange}></input></div>
            </form>
        )
    }
}

export default connect(state => state.queryValues, { setFilter })(QueryElements);