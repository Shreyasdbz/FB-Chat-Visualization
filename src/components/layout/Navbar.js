import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

class Navbar extends Component{
    render(){
        return(
            <div className="navbar-fixed">
                <nav className="nav-wrapper blue darken-2">
                    <div className="container">
                        <Link to="/" className="brand-logo">Facebook Chat Visualizer</Link>
                        <ul className="right">
                            <li><NavLink to="/Dashboard">Dashboard</NavLink></li>
                            <li><NavLink to="/About">About</NavLink></li>
                            <li><NavLink to="/Exit">Exit</NavLink></li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar