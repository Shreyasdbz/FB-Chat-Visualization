import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
// import { connect } from 'react-redux'
//Visual Components
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/layout/Dashboard";
import Landing from "./components/layout/Landing";
//Store components
import store from "./components/redux/store/store";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/Dashboard" component={Dashboard} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
