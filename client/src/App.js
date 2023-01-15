import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import RegisterContent from "./components/RegisterContent";
import LoginContent from "./components/LoginContent";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<h1>Hello</h1>}></Route>
          <Route
            path="/register"
            element={
              <RegisterForm
                url={"http://localhost:3500/register"}
                children={<RegisterContent />}
              />
            }
          ></Route>
          <Route
            path="/login"
            element={
              <RegisterForm
                url={"http://localhost:3500/login"}
                children={<LoginContent />}
              />
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
