import "./App.css";
import { Register } from "./app/Register";
import { Login } from "./app/Login";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [loginStatus, setLoginStatus] = useState("");
  axios.defaults.withCredentials = true;

  const handleStatusChange = (status) => {
    setLoginStatus(status);
  };

  const logout = () => {
    axios
      .post("http://localhost:8080/logout", {
        loginStatus,
      })
      .then((response) => {
        setLoginStatus(response.loggedIn);
      });
  };
  useEffect(() => {
    axios.get("http://localhost:8080/login").then((response) => {
      if (response.data.loggedIn === true)
        setLoginStatus(response.data.user[0].username);
    });
  }, []);

  return (
    <div className="app">
      <h1>React Authentication</h1>
      <Register />
      <br />
      <br />
      <Login onstatuschange={handleStatusChange} />
      <h2>{loginStatus}</h2>
      <br />
      <button type="button" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default App;
