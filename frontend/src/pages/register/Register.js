import React from 'react';
import { useHistory } from 'react-router-dom';

import * as yup from 'yup';

import { ErrorMessage, Formik, Form, Field } from 'formik';

import LoginHeader from '../../components/loginHeader';

import { signUp } from '../../api/user';

import styles from './styles.module.css';

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
      .min(6, 'Senha muito curta, deve ter no mínimo 6 caracteres.')
      .required('Informe uma senha')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
        'A senha deve conter, uma letra maiúscula, uma minúscula, um número e um caracter especial'
      ),
  });

  return (
    <>
      <div>
        <LoginHeader />
        <Formik
          initialValues={{ name: '', lastName: '', email: '', password: '' }}
          onSubmit={handleSubmit}
          validationSchema={validations}
        >
          <Form className={styles.register}>
            <div className={styles.register__group}>
              <Field
                className={styles.register__field}
                name="name"
                type="text"
                placeholder="Name"
              />
              <ErrorMessage
                className={styles.register__error}
                component="span"
                name="name"
              />
            </div>

            <div className={styles.register__group}>
              <Field
                className={styles.register__field}
                name="lastName"
                type="text"
                placeholder="Last Name"
              />
              <ErrorMessage
                className={styles.register__error}
                component="span"
                name="lastName"
              />
            </div>

            <div className={styles.register__group}>
              <Field
                className={styles.register__field}
                name="email"
                type="email"
                placeholder="E-mail"
              />
              <ErrorMessage
                className={styles.register__error}
                component="span"
                name="email"
              />
            </div>
            <div className={styles.register__group}>
              <Field
                className={styles.register__field}
                name="password"
                type="password"
                placeholder="Password"
              />
              <ErrorMessage
                className={styles.register__error}
                component="span"
                name="password"
              />
            </div>
            <div className={styles.register__btn}>
              <button className={styles.btn} type="submit">
                Salvar
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default Register;
