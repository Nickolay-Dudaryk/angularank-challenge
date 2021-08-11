import React from "react";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import Contributors from "./views/Contributors";
import Test from "./views/RepositoryData";
import Error from "./views/Error";
import ContributorData from "./views/ContributorData";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Contributors/>
        </Route>
        <Route exact path="/:id">
          <ContributorData/>
        </Route>
        <Route exact path="/repository">
          <Test/>
        </Route>
        <Route exact path="/error">
          <Error/>
        </Route>
        <Redirect exact to="/error"/>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
