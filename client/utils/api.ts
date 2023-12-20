import axios from 'axios';
import Cookies from 'js-cookie';

const api = (baseURL: any) =>
  axios.create({
    baseURL: baseURL,
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
      'Content-Type': 'application/json',
    },
  });

export default api;
