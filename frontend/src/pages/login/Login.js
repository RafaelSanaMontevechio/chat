import React from 'react';
import { useHistory } from 'react-router-dom';

import * as yup from 'yup';

import { ErrorMessage, Formik, Form, Field } from 'formik';

import { signIn } from '../../api/user';

import LoginHeader from '../../components/loginHeader';

import './login.css';

const Login = () => {
  const history = useHistory();

  const handleSubmit = (values) => {
    signIn(values, history);
  };

  const validations = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(4).required(),
  });

  return (
    <>
      <div className="login-container">
        <LoginHeader />
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={handleSubmit}
          validationSchema={validations}
        >
          <Form className="login">
            <div className="login-group">
              <Field
                className="login-field"
                type="email"
                name="email"
                placeholder="E-mail"
              />
              <ErrorMessage
                className="login-error"
                component="span"
                name="email"
              />
            </div>
            <div className="login-group">
              <Field
                className="login-field"
                name="password"
                type="password"
                placeholder="Password"
              />
              <ErrorMessage
                className="login-error"
                component="span"
                name="password"
              />
            </div>
            <div className="login-btn">
              <button className="btn" type="submit">
                Login
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default Login;
