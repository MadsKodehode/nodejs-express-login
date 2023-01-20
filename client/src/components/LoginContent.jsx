import { useState } from "react";
import { Link, redirect } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const LoginContent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState([]);
  const [login, setLogin] = useState(false);
  const handleLogin = (e) => {
    e.preventDefault();
    //Send POST request
    fetch("http://localhost:3500/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => setResponse(data))
      .then(cookies.set("jwt", response.token, { path: "/" }))
      .catch((err) => console.log(err));

    if (response.success) window.location.href = "/auth-access";
  };

  return (
    <>
      <h2 className="headline-form">Sign in</h2>
      <div className="wrap-input">
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
          onClick={(e) => handleLogin(e)}
        >
          Sign in
        </button>
        {response.success ? (
          <p className="response-p">{response.message}</p>
        ) : (
          <p className="error">{response.message}</p>
        )}
        <p className="p-form">Dont have an account?</p>
        <Link className="link-form" to="/register">
          Create Account
        </Link>
      </div>
    </>
  );
};

export default LoginContent;
