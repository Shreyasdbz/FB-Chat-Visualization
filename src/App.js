import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
//Import Components
import Navbar from './components/layout/Navbar'
import Dashboard from './components/Dashboard'
import Landing from './components/Landing'

class App extends Component{
  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing}/>
            <Route exact path="/Dashboard" component={Dashboard}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}


export default App;
