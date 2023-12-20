import useSWR from 'swr';
import axios from 'axios';
import Cookies from 'js-cookie';

const fetcher = (url: string) => {
  const token = Cookies.get('token');
  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

export default fetcher;