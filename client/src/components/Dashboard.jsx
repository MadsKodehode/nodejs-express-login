import { useEffect, useState } from "react";
import { Link, redirect, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const Dashboard = () => {
  const [response, setResponse] = useState([]);
  const [authorized, setAuthorized] = useState(false);

  const token = cookies.get("jwt");
  /* if (!token) window.location.href = "/login"; */

  const logOut = () => {
    cookies.remove("jwt", { path: "/" });
    window.location.href = "/";
  };
  useEffect(() => {
    const myHeaders = new Headers();
    if (token) {
      myHeaders.append("Content-type", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);
    }
    fetch("http://localhost:3500/dashboard", {
      method: "GET",
      headers: myHeaders,
    })
      .then((res) => {
        if (res.status === 200) {
          setAuthorized(true);
          return res.json();
        }
      })
      .then((data) => setResponse(data))
      .catch((err) => console.error(err));
  }, []);

  return authorized ? (
    <>
      <h1>{response.message}</h1>
      <Link to="/auth-access">Auth</Link>
      <Link to="/free-access">Free</Link>
      <button onClick={() => logOut()}>Logout</button>
    </>
  ) : (
    ""
  );
};

export default Dashboard;
