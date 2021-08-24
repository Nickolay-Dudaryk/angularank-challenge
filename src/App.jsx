import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Contributors from "./views/Contributors";
import RepositoryData from "./views/RepositoryData";
import Error from "./views/Error";
import ContributorData from "./views/ContributorData";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <Contributors />
      </Route>
      <Route path="/contributor/:id">
        <ContributorData />
      </Route>
      <Route path="/repository/:id">
        <RepositoryData />
      </Route>
      <Route path="/error">
        <Error />
      </Route>
      <Redirect to="/error" />
    </Switch>
  </BrowserRouter>
);

export default App;
