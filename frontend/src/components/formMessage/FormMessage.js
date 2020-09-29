import React from 'react';

import SendSharpIcon from '@material-ui/icons/SendSharp';
import { ErrorMessage, Formik, Form, Field } from 'formik';
import * as yup from 'yup';

const validations = yup.object().shape({
    message: yup.string().required(),
  });



const FormMessage = ({handleFormSubmit}) => {
    return (
        <div className="flex p-2 bg-white h-32 rounded-lg shadow-lg">
        <Formik
          initialValues={{ message: '' }}
          onSubmit={handleFormSubmit}
          validationSchema={validations}
        >
          <Form className="form-message">
            <div className="div-form-message">
              <Field
                className="message-field"
                type="text"
                name="message"
                placeholder="Message"
              />
              <ErrorMessage
                className="message-error"
                component="span"
                name="message"
              />
            </div>
            <div className="send-btn">
              <button className="send" type="submit">
                <SendSharpIcon />
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    );
}

export default FormMessage;