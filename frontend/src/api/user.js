import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

export const signIn = async (values, history) => {
  const res = await axios.post(`${BASE_URL}/login`, values);
  const { data } = res;
  if (data) {
    const json = JSON.stringify([data]);
    localStorage.setItem('app-token', json);
    history.push('/home');
  }
};

export const signUp = async (values, history) => {
  const res = await axios.post(`${BASE_URL}/users/create`, {
    firstName: values.name,
    lastName: values.lastName,
    email: values.email,
    password: values.password,
  });
  const { data } = res;

  if (data) {
    const json = JSON.stringify([data]);
    localStorage.setItem('app-token', json);
    history.push('/login');
  }
};

export const signOut = (history) => {
  localStorage.removeItem('app-token');
  history.push('/login');
};

export const getUserLocalStorage = () => {
  const data = localStorage.getItem('app-token');
  return JSON.parse(data);
};

export const getTokenLocalStorage = () => {
  const data = getUserLocalStorage();
  return data[0].authorization;
};

export const getUsersByName = async (char) => {
  const res = await axios.get(`${BASE_URL}/users/find/${char}`);
  const { data } = res;
  if (data) {
    return data;
  }
};
