import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const Auth = () => {
  //State for storing response data
  const [response, setResponse] = useState([]);

  //Get token from cookies
  const token = cookies.get("accToken");

  //Refresh token function
  const refreshJwt = async () => {
    //Send request to refresh the jwt
    const res = await fetch("http://localhost:3500/refresh", {
      method: "POST",
      credentials: "include",
    });
    //Recieve data back
    /*  const data = await res.json(); */
    const data = await res.json();

    if (data.accessToken) cookies.remove("accToken", { path: "/" });

    cookies.set("accToken", data.accessToken, { path: "/" });
  };

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
      .then((res) => res.json())
      .then((data) => {
        if (data.tokenExpired) refreshJwt();

        setResponse(data);
      })
      .catch((err) => console.log(err));
  }, [token]);

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
