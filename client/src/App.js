import "./App.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import RegisterContent from "./components/RegisterContent";
import LoginContent from "./components/LoginContent";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
function App() {
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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/auth-access" element={<Auth></Auth>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
