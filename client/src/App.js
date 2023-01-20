import "./App.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import RegisterContent from "./components/RegisterContent";
import LoginContent from "./components/LoginContent";
import Auth from "./components/Auth";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<h1>Home</h1>}></Route>
          <Route
            path="/register"
            element={<RegisterForm children={<RegisterContent />} />}
          ></Route>
          <Route
            path="/login"
            element={<RegisterForm children={<LoginContent />} />}
          ></Route>
          <Route path="/auth-access" element={<Auth></Auth>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
