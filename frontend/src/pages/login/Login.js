import React from 'react';
import { useHistory } from 'react-router-dom';

import * as yup from 'yup';

import { ErrorMessage, Formik, Form, Field } from 'formik';

import { signIn } from '../../api/user';

import LoginHeader from '../../components/loginHeader';

import styles from './styles.module.css';

const Login = () => {
  const history = useHistory();

  const handleSubmit = (values) => {
    signIn(values, history);
  };

  const validations = yup.object().shape({
    email: yup
      .string()
      .email('Informe um e-mail válido')
      .required('Informe seu e-mail'),
    password: yup
      .string()
      .min(6, 'Senha muito curta, deve ter no mínimo 6 caracteres.')
      .required('Informe sua senha'),
  });

  return (
    <>
      <div>
        <LoginHeader />
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={handleSubmit}
          validationSchema={validations}
        >
          <Form className={styles.login}>
            <div className={styles.login__group}>
              <Field
                className={styles.login__field}
                type="email"
                name="email"
                placeholder="E-mail"
              />
              <ErrorMessage
                className={styles.login__error}
                component="span"
                name="email"
              />
            </div>
            <div className={styles.login__group}>
              <Field
                className={styles.login__field}
                name="password"
                type="password"
                placeholder="Password"
              />
              <ErrorMessage
                className={styles.login__error}
                component="span"
                name="password"
              />
            </div>
            <div className={styles.login__btn}>
              <button className={styles.btn} type="submit">
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
