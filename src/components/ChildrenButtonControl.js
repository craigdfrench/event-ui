import React from 'react';

class ChildrenButtonControl extends React.Component {
    constructor(props) {
        super(props)
        this.state = { enabled: true }
     }

     render() {
        return (
            <div>
                <button onClick={() => this.setState({ enabled: this.state.enabled ? false : true })}>{this.state.enabled ? "Hide" : "Show"} {this.props.name}</button>
                <div>
                    {this.state.enabled ? this.props.children : []}
                </div>
            </div>
        )
    }
}
export default ChildrenButtonControl