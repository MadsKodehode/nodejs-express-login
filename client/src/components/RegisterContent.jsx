import { Link } from "react-router-dom";

const RegisterContent = () => {
  return (
    <>
      <h2 className="headline-form">Create Account</h2>
      <div className="wrap-input">
        <label htmlFor="username">UserName</label>

        <input type="text" className="username" name="username"></input>
        <label htmlFor="email">Email</label>

        <input type="text" className="email" name="email"></input>
        <label htmlFor="password1">Password</label>

        <input type="password" className="password" name="password"></input>

        <button className="btn-submit" type="submit">
          Create Acoount
        </button>
        <p className="p-form">Already have an account?</p>
        <Link className="link-form" to="/login">
          Sign in
        </Link>
      </div>
    </>
  );
};

export default RegisterContent;
