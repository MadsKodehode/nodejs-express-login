import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const Dashboard = () => {
  //State for storing response data
  const [response, setResponse] = useState([]);

  //Get access token from cookies
  const token = cookies.get("accToken");

  //Logout function
  const logOut = async () => {
    cookies.remove("accToken", { path: "/" });
    /* window.location.href = "/";  */

    //Make post request to logout
    const res = await fetch("http://localhost:3500/logout", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });
    console.log(res);

    const data = await res.json();
    if (data.shouldRedirect) return (window.location.href = "/login");
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
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 401) {
          return logOut();
        } else {
          return res.json();
        }
      })
      .then((data) => {
        if (!data?.shouldRedirect) {
          setResponse(data);
        } else {
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return token ? (
    <>
      <h1>{response.message}</h1>
      <Link to="/auth-access">Auth</Link>
      <button onClick={() => logOut()}>Logout</button>
    </>
  ) : (
    <>
      <Navigate to="/login" />
    </>
  );
};

export default Dashboard;
