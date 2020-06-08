import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
// import { connect } from 'react-redux'
//Visual Components
import Navbar from './components/layout/Navbar'
import Dashboard from './components/Dashboard'
import Landing from './components/Landing'
//Store components
import rootReducer from './store/rootReducer'

const store = createStore(rootReducer)


class App extends Component{
  render(){
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path="/" component={Landing}/>
              <Route exact path="/Dashboard" component={Dashboard}/>
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}


export default App;
