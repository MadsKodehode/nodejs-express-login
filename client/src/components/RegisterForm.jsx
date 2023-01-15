const RegisterForm = ({ url, children }) => {
  return (
    <form className="form" action={url} method="POST">
      {children}
    </form>
  );
};

export default RegisterForm;
