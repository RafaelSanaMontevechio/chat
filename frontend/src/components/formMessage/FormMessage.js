import React from 'react';

import SendSharpIcon from '@material-ui/icons/SendSharp';
import { ErrorMessage, Formik, Form, Field } from 'formik';
import * as yup from 'yup';

const validations = yup.object().shape({
    message: yup.string().required('Digite sua mensagem!'),
  });



const FormMessage = ({handleFormSubmit}) => {
    return (
        <div className="flex items-center p-2 bg-white h-32 rounded-lg shadow-lg">
        <Formik
          initialValues={{ message: '' }}
          onSubmit={handleFormSubmit}
          validationSchema={validations}
        >
          <Form className="w-full flex flex-row">
            <div className="w-2/3 flex flex-col py-4">
              <Field
                className="bg-gray-300 appearance-none border-2 ml-2 border-gray-300 rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                type="text"
                name="message"
                placeholder="Message"
              />
              <ErrorMessage
                className="text-red-500 p-2 text-sm uppercase font-medium" 
                component="span"
                name="message"
              />
            </div>
            <div className="p-4">
              <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold p-2 rounded" type="submit">
                <SendSharpIcon /> 
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    );
}

export default FormMessage;