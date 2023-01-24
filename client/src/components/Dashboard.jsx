import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const Dashboard = () => {
  //State for storing response data
  const [response, setResponse] = useState([]);

  //Get token from cookies
  const token = cookies.get("jwt");

  //Logout function
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
          return res.json();
        }
      })
      .then((data) => setResponse(data))
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
