import { useEffect } from "react";
import { useState } from "react";
import { Link, redirect } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const LoginContent = () => {
  //Input states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Reset state when re entering email and password
  useEffect(() => {
    setDisabled(false);
  }, [email, password]);

  //State for displaying response
  const [response, setResponse] = useState([]);

  //State for disabling button if clicked once
  const [disabled, setDisabled] = useState(false);

  //Function for sending post request to login endpoint
  const fetchLogin = async () => {
    //POST request to login endpoint
    const res = await fetch("http://localhost:3500/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    //Await response
    const data = await res.json();

    //Set cookie with accesstoken
    if (data.token) cookies.set("jwt", data.token, { path: "/" });

    //Store response data
    return setResponse(data);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    if (disabled) return;

    setEmail("");
    setPassword("");

    setDisabled(true);
    console.log("Clicked");

    fetchLogin();
    const timeOut = setTimeout(() => {
      setResponse([]);
    }, 5000);

    return () => clearTimeout(timeOut);
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
