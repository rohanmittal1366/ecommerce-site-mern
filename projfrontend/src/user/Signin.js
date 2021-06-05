import React, { useState } from "react";
import { Redirect, Link } from "react-router";
import { authenticate, authenticated, signin } from "../auth/helper";
import Base from "../core/Base";

const Signin = () => {
  const [values, setValues] = useState({
    email: "badhunter5@gmail.com",
    password: "Badhunt@123",
    error: "",
    loading: false,
    didRedirect: false,
  });

  // destructuring the values
  const { email, password, error, loading, didRedirect } = values;
  const { user } = authenticated();

  // change in event or name then this method call
  const handleChange = (email) => (event) => {
    setValues({ ...values, error: false, [email]: event.target.value });
  };

  // when user click submit button
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch(console.log("Signin request failed"));
  };

  // check whether the user is admin or not and redirect it to that page
  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (authenticated()) {
      return <Redirect to="/" />;
    }
  };

  // to print the message that site is loading
  const loadingMesssage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  // to print error
  const errorMesssage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            {/* Component for name */}
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                value={email}
                onChange={handleChange("email")}
                className="form-control"
                type="email"
              />
            </div>

            {/* Component for password */}
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                value={password}
                onChange={handleChange("password")}
                className="form-control"
                type="password"
              />
            </div>
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Signin page " discription="A page for user to signin">
      {loadingMesssage()}
      {errorMesssage()}
      {signInForm()}
      {performRedirect()}
      {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
    </Base>
  );
};

export default Signin;
