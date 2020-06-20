import React, { Component } from 'react';

class FunctionWrapper extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return(
            <div>{this.props.children}</div>
        )
    }
}

export default FunctionWrapper;