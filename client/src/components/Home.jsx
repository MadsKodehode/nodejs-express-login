import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h1 className="home-headline">HomePage</h1>
      <div className="link-wrap">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/free-access">Free</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </div>
    </>
  );
};

export default Home;
