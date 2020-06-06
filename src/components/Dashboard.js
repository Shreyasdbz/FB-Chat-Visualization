import React, { Component } from 'react'

class Dashboard extends Component{
    state = {
        title: ""
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleClick = (e) => {
        e.preventDefault();
        this.setState({
            varA: e.target.value
        })        
        console.log(this.state)
    }

    render(){
        return(
            <div className="container">
                Dashboard
            </div>
        )
    }
}

export default Dashboard