import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const Auth = () => {
  //State for storing response data
  const [response, setResponse] = useState([]);

  //Get token from cookies
  const token = cookies.get("accToken");

  //Fetch auth route
  useEffect(() => {
    const myHeaders = new Headers();
    if (token) {
      myHeaders.append("Content-type", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);
    }

    fetch("http://localhost:3500/auth-access", {
      method: "GET",
      headers: myHeaders,
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => setResponse(data))
      .catch((err) => console.log(err));
  }, []);

  return token ? (
    <>
      <h1>{response.message}</h1>
    </>
  ) : (
    <>
      <Navigate to="/login"></Navigate>
    </>
  );
};

export default Auth;
