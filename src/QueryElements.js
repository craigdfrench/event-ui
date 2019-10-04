import React from 'react';
import './App.css';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import 'moment';
import TimePicker from 'react-time-picker';


class QueryElements extends React.Component {
    constructor(props) {
        super(props)
        this.state = { focusedInput: null }
    }

    onChange = event => this.props.onQueryChange(event.target.name,event.target.value)
    startTimeUpdate = time => this.props.onQueryChange("startTimeControl",time)
    endTimeUpdate = time => this.props.onQueryChange("endTimeControl",time)
    
    render() {
        return (
                <form>

                <textarea readOnly value={`Dates are ${this.props.queryValues.startTime} ${this.props.queryValues.endTime} `}/>
                    Date Filter:
                    <DateRangePicker
                        startDate={this.props.queryValues.startDateControl} // momentPropTypes.momentObj or null,
                        startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                        endDate={this.props.queryValues.endDateControl} // momentPropTypes.momentObj or null,
                        endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                        onDatesChange={({ startDate, endDate }) => {
                            this.props.onQueryChange("startDateControl", startDate)
                            this.props.onQueryChange("endDateControl", endDate)
                        }}
                        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                        onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                        isOutsideRange={ day => false}/>
                    <div>
                        Time Filter:
                        <span>Start<TimePicker onChange={this.startTimeUpdate} value={this.props.queryValues.startTimeControl}/></span>
                        <span>End:<TimePicker  onChange={this.endTimeUpdate} value={this.props.queryValues.endTimeControl}/></span>
                    </div>
                    <div>Id: <input type='text' name='id' value={this.props.queryValues.id} onChange={this.onChange}/></div>
                    <div>Email: <input type='text' name='email' value={this.props.queryValues.email} onChange={this.onChange}></input></div>
                    <div>Environment: <input type='text' name='environment' value={this.props.queryValues.environment} onChange={this.onChange}></input></div>
                    <div>Component: <input type='text' name='component' value={this.props.queryValues.component} onChange={this.onChange}></input></div>
                    <div>Message: <input type='text' name='message' value={this.props.queryValues.message} onChange={this.onChange}></input></div>
                </form>
            ) 
        }   
}

export default QueryElements;