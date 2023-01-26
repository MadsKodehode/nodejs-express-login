import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const LoginContent = () => {
  const token = cookies.get("accToken");
  const myHeaders = new Headers();
  //Input states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //State for displaying response
  const [response, setResponse] = useState([]);

  //State for disabling button if clicked once
  const [disabled, setDisabled] = useState(false);
  //State for logged in
  const [loggedIn, setLoggedIn] = useState(false);
  //State for checking remember me in login
  const [checked, setChecked] = useState(false);

  //Get login page
  useEffect(() => {
    if (token) myHeaders.append("Authorization", "Bearer " + token);

    fetch("http://localhost:3500/login", {
      method: "GET",
      headers: myHeaders,
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setResponse(data);
        if (data.shouldRedirect) {
          setLoggedIn(true);
          const timeOut = setTimeout(() => {
            window.location.href = "/dashboard";
          }, 5000);
          timeOut();
          return clearTimeout(timeOut);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  //Reset state when re entering email and password
  useEffect(() => {
    setDisabled(false);
  }, [email, password]);

  //Function for sending post request to login endpoint
  const fetchLogin = async () => {
    //POST request to login endpoint
    const res = await fetch("http://localhost:3500/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
        checked,
      }),
    });

    //Await response
    const data = await res.json();

    //Set cookie with accesstoken
    if (data.token) cookies.set("accToken", data.token, { path: "/" });

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

  return loggedIn ? (
    <>
      <h1>{response.message}</h1>
      <p>Redirecting...</p>
    </>
  ) : (
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
        <span>
          <label htmlFor="remember">Remember me</label>
          <input
            type="checkbox"
            name="remember"
            value={checked}
            onChange={(e) => setChecked((current) => !current)}
          ></input>
        </span>
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
