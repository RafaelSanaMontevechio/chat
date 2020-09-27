import React from 'react';
import { useHistory } from 'react-router-dom';

import * as yup from 'yup';

import { ErrorMessage, Formik, Form, Field } from 'formik';

import LoginHeader from '../../components/loginHeader';

import { signUp } from '../../api/user';

import './register.css';

const Register = () => {
  const history = useHistory();

  const handleSubmit = (values) => {
    signUp(values, history);
  };

  const validations = yup.object().shape({
    name: yup.string().required('Informe seu nome'),
    lastName: yup.string().required('Informe seu sobrenome'),
    email: yup.string().email().required('Informe seu e-mail'),
    password: yup
      .string()
      .min(6, 'A senha muito curta, deve ter no mínimo 6 caracteres.')
      .required('Informe uma senha')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
        'A senha deve conter A a 1 @'
      ),
  });

  return (
    <>
      <div className="login-container">
        <LoginHeader />
        <Formik
          initialValues={{ name: '', lastName: '', email: '', password: '' }}
          onSubmit={handleSubmit}
          validationSchema={validations}
        >
          <Form className="login">
            <div className="login-group">
              <Field
                className="login-field"
                name="name"
                type="text"
                placeholder="Name"
              />
              <ErrorMessage
                className="login-error"
                component="span"
                name="name"
              />
            </div>

            <div className="login-group">
              <Field
                className="login-field"
                name="lastName"
                type="text"
                placeholder="Last Name"
              />
              <ErrorMessage
                className="login-error"
                component="span"
                name="lastName"
              />
            </div>

            <div className="login-group">
              <Field
                className="login-field"
                name="email"
                type="email"
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
                Sign Up
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default Register;
