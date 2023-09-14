import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';

const Login = () => {
  const history = useHistory();
  const [loggedInUser, setLoggedInUser] = useState(null);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    axios
      .post('http://127.0.0.1:8000/api/v1/login_admin', values)
      .then((response) => {
        console.log('Login successful', response.data);
        // Handle successful login, e.g., store authentication token
        setLoggedInUser(response.data.user); // Assuming the user data is returned in the response
        history.push('/login'); // Redirect to the homepage
      })
      .catch((error) => {
        console.error('Login failed', error.response.data);
        // Handle login error, display an error message
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="container">
                <div className="text-center mt-3">
                <Link to="/">Home</Link>
              </div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title d-flex justify-content-center">Login</h2>
              {loggedInUser ? (
                // Display user info and logout button if logged in
                <div>
                  <p>Welcome, {loggedInUser.name}</p>
                  <button
                    onClick={() => {
                      // Perform logout logic here
                      setLoggedInUser(null);
                      // Redirect to the login page or any other desired route
                      history.push('/login');
                    }}
                    className="btn btn-danger"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                // Display the login form if not logged in
                <form onSubmit={formik.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      className="form-control"
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className="error">{formik.errors.email}</div>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      className="form-control"
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <div className="error">{formik.errors.password}</div>
                    ) : null}
                  </div>
                  <div className="form-group d-flex justify-content-center">
                    <button type="submit" disabled={formik.isSubmitting} className="btn btn-primary">
                      Login
                    </button>
                  </div>
                </form>
              )}
            
              {/* "Don't have an account? Create one" button */}
              <div className="text-center mt-3">
                <Link to="/register">Don't have an account? Create one</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
