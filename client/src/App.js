import "./App.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import RegisterContent from "./components/RegisterContent";
import LoginContent from "./components/LoginContent";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Cookies from "universal-cookie";
function App() {
  const cookies = new Cookies();
  //Logout function
  const logOut = async () => {
    //Remove access token from cookies
    cookies.remove("accToken", { path: "/" });
    //Make post request to logout
    const res = await fetch("http://localhost:3500/logout", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    if (data.shouldRedirect) return (window.location.href = "/login");
  };

  //Refresh token function
  const refreshJwt = async () => {
    //Send request to refresh the jwt
    const res = await fetch("http://localhost:3500/refresh", {
      method: "POST",
      credentials: "include",
    });
    if (res.status === 401 || res.status === 403) {
      logOut();
    }

    const data = await res.json();

    if (data.accessToken) cookies.remove("accToken", { path: "/" });

    cookies.set("accToken", data.accessToken, { path: "/" });
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/register"
            element={<RegisterForm children={<RegisterContent />} />}
          ></Route>
          <Route
            path="/login"
            element={<RegisterForm children={<LoginContent />} />}
          ></Route>
          <Route
            path="/dashboard"
            element={<Dashboard functions={[logOut, refreshJwt]} />}
          />
          <Route
            path="/auth-access"
            element={<Auth refreshJwt={refreshJwt} />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
