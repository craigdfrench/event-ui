import React from 'react';
import './App.css';
import QueryElements from './QueryElements';
import moment from 'moment';

const fields = ["id", "createdAt", "environment", "component", "email", "message", "startTimeControl", "endTimeControl" ];
const dateFields = ["startDateControl", "endDateControl"];

class Query extends React.Component {
    constructor(props) {
        super(props)
        this.state = { enabled: true, queryValues: {} }

        for (var flds of fields) {
            this.state.queryValues[flds] = ""
        }
        for (flds of dateFields) {
            this.state.queryValues[flds] = null
        }
    }

    onQueryChange = (name, value) => {
        console.log("onQueryChange", name, value)

        var { queryValues } = this.state
        queryValues[name] = value;

        if (!queryValues.startDateControl && !queryValues.startTimeControl ) {
            queryValues["startTime"]=""
        } else {
            var startTimeMoment = ( !queryValues.startDateControl ) ? moment().hours(0).minutes(0).seconds(0).milliseconds(0) : queryValues.startDateControl
            if (queryValues.startTimeControl) {
                startTimeMoment.hour(queryValues.startTimeControl.split(':')[0]).minutes(queryValues.startTimeControl.split(':')[1]).seconds(0).millisecond(0) 
            }
            queryValues["startTime"] = startTimeMoment.toISOString()
        }

        if (!queryValues.endDateControl && !queryValues.endTimeControl ) {
            queryValues["endTime"]=""
        } else {
            var endTimeMoment = ( !queryValues.endDateControl ) ? moment().hours(23).minutes(59).seconds(59).milliseconds(999) : queryValues.endDateControl
            if (queryValues.endTimeControl) {
                endTimeMoment.hour(queryValues.endTimeControl.split(':')[0]).minutes(queryValues.endTimeControl.split(':')[1]).seconds(0).millisecond(0) 
            }
            queryValues["endTime"]=endTimeMoment.toISOString()
        }
        
        // Filter out these state variables because they are composed into startTime and endTime 
        const { startTimeControl:_1, endTimeControl:_2, startDateControl:_3, endDateControl:_4, ...forQuery } = queryValues;

        this.props.onQuery(forQuery)
        this.setState({ queryValues: queryValues })
    }

    render() {
        return (
            <div>
                <button onClick={() => this.setState({ enabled: this.state.enabled ? false : true })}>{this.state.enabled ? "Hide" : "Show"} Query</button>
                <div>
                    {this.state.enabled ?
                        <QueryElements
                            queryValues={this.state.queryValues}
                            onQueryChange={this.onQueryChange}>
                        </QueryElements>
                        : []}
                </div>
            </div>
        )
    }
}

export default Query;