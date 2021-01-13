import "./App.css";
import { Register } from "./app/Register";
import { Login } from "./app/Login";
import React, { useState } from "react";

function App() {
  const [isLoggedin, setIsLoggedIn] = useState("");
  const [user, setUser] = useState({});

  const handleStatusChange = (user, status) => {
    setIsLoggedIn(status);
    setUser(user);
  };

  return (
    <div className="app">
      <h1>React Authentication</h1>
      <Register />
      <br />
      <br />
      <Login onstatuschange={handleStatusChange} />
      <h2>
        {isLoggedin === "loggedin"
          ? `Hello ${user.firstname}`
          : isLoggedin === "Wrong details"
          ? "Wrong username/password combination"
          : "Hi guest"}
      </h2>
    </div>
  );
}

export default App;
