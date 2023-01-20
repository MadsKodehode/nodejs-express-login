import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const Auth = () => {
  const token = cookies.get("jwt");
  if (!token) window.location.href = "/";
  const [response, setResponse] = useState([]);
  console.log(response);
  const logOut = () => {
    cookies.remove("jwt", { path: "/" });

    window.location.href = "/";
  };
  useEffect(() => {
    const myHeaders = new Headers();

    if (token) myHeaders.append("Content-type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    fetch("http://localhost:3500/auth-access", {
      method: "GET",
      headers: myHeaders,
    })
      .then((res) => res.json())
      .then((data) => setResponse(data))
      .catch((err) => console.log(err));
  }, []);

  return token !== undefined ? (
    <>
      <h1>{response.message}</h1>
      <button onClick={() => logOut()}>Logout</button>
    </>
  ) : (
    ""
  );
};

export default Auth;
