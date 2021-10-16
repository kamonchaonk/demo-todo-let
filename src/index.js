import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import ToDoList from "./component/toDoList";
import Login from "./component/login";
import { Route, Switch, BrowserRouter } from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/todos" component={ToDoList} />
        {/* <Route path="/*" component={<></>} /> */}
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
