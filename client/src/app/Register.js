import React, { useState } from "react";
import axios from "axios";
import { nanoid } from "nanoid";

export const Register = () => {
  const [regUserName, setregUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [regPassword, setregPassword] = useState("");

  const onRegister = () => {
    axios
      .post("http://localhost:8080/register", {
        id: nanoid(15),
        username: regUserName,
        firstName,
        lastName,
        password: regPassword,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
    setregPassword("");
    setregUserName("");
    setFirstName("");
    setLastName("");
  };

  return (
    <div className="registerForm">
      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        name="firstName"
        id="firstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <br />
      <label htmlFor="lastName">Last Name</label>
      <input
        type="text"
        name="lastName"
        id="lastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <br />
      <label htmlFor="regUserName">username</label>
      <input
        type="text"
        name="regUserName"
        id="regUserName"
        value={regUserName}
        onChange={(e) => setregUserName(e.target.value)}
      />
      <br />
      <label htmlFor="regPassword">Password</label>
      <input
        type="regPassword"
        name="regPassword"
        id="regPassword"
        value={regPassword}
        onChange={(e) => setregPassword(e.target.value)}
      />
      <br />
      <button type="button" className="btn" onClick={onRegister}>
        Register
      </button>
    </div>
  );
};
