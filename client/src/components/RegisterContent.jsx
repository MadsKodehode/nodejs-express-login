import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const RegisterContent = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState([]);
  console.log(response);
  const handleRegister = (e) => {
    e.preventDefault();

    fetch("http://localhost:3500/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => setResponse(data))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h2 className="headline-form">Create Account</h2>
      <div className="wrap-input">
        <label htmlFor="username">UserName</label>
        <input
          type="text"
          className="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          className="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button
          className="btn-submit"
          type="submit"
          onClick={(e) => handleRegister(e)}
        >
          Create Acoount
        </button>
        {response.success ? (
          <p className="response-p">{response.message}</p>
        ) : (
          <p className="error">{response.message}</p>
        )}
        <p className="p-form">Already have an account?</p>
        <Link className="link-form" to="/login">
          Sign in
        </Link>
      </div>
    </>
  );
};

export default RegisterContent;
