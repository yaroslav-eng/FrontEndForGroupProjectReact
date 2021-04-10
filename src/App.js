// import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Landing from "./components/Landing";
import WorkPage from "./components/WorkPage";



const App = props => {

  return (
      <div >
          <BrowserRouter>
        <Switch>
          <Route exact path={["/", "/home"]} component={Landing} />
          <Route exact path="/login" component={Login} />
          {/*<Route exact path="/register" component={Register} />*/}
            <Route exact path="/dashboard" component={WorkPage} />

        </Switch>
          </BrowserRouter>

      </div>
  );
};

export default App;
