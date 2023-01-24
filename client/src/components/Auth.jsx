import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const Auth = () => {
  //State for storing response data
  const [response, setResponse] = useState([]);
  //Bool for authorized access
  const [authorized, setAuthorized] = useState(false);

  const token = cookies.get("jwt");

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
          setAuthorized(true);
          console.log(authorized);
          return res.json();
        }
      })
      .then((data) => setResponse(data))
      .catch((err) => console.log(err));
  }, []);

  return authorized ? (
    <>
      <h1>{response.message}</h1>
    </>
  ) : (
    <>
      <h1>You need to be logged in!</h1>
      <Link to="/login">Go to login</Link>
    </>
  );
};

export default Auth;
