import { Link } from "react-router-dom";

const LoginContent = () => {
  return (
    <>
      <h2 className="headline-form">Sign in</h2>
      <div className="wrap-input">
        <label htmlFor="email">Email</label>
        <input type="text" className="email" name="email"></input>
        <label htmlFor="password">Password</label>
        <input type="password" className="password" name="password"></input>
        <button className="btn-submit" type="submit">
          Sign in
        </button>
        <p className="p-form">Dont have an account?</p>
        <Link className="link-form" to="/register">
          Create Account
        </Link>
      </div>
    </>
  );
};

export default LoginContent;
