import React from 'react';
import { connect } from 'react-redux'
import QueryElements from './QueryElements';

class Query extends React.Component {
    constructor(props) {
        super(props)
        this.state = { enabled: true }
     }

     render() {
        return (
            <div>
                <button onClick={() => this.setState({ enabled: this.state.enabled ? false : true })}>{this.state.enabled ? "Hide" : "Show"} Query</button>
                <div>
                    {this.state.enabled ?
                        <QueryElements/>
                        : []}
                </div>
            </div>
        )
    }
}
export default connect(null,  null)(Query);