import React, { useState } from "react";
import axios from "axios";

export const Login = ({ onstatuschange }) => {
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");

  axios.defaults.withCredentials = true;
  const onLogin = () => {
    axios
      .post("http://localhost:8080/login", {
        username,
        password,
      })
      .then((response) => {
        if (response.status === 200) {
          if (response.data.length) {
            onstatuschange(response.data[0].username);
          }
          if (response.data.message) {
            onstatuschange(response.data.message);
          }
        }
      })
      .catch((e) => console.log(e));
    setUserName("");
    setPassword("");
  };

  return (
    <div className="loginForm">
      <label htmlFor="username">username</label>
      <input
        type="text"
        name="username"
        id="username"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
      />
      <br />
      <label htmlFor="password">password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button type="button" className="btn" onClick={onLogin}>
        Login
      </button>
    </div>
  );
};
