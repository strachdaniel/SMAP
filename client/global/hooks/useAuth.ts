import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import Cookies from 'js-cookie';
import { userAtom } from '../stores/userAtom';
import { useRouter } from 'next/router';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

interface IUser {
  name: string;
  email: string;
  role: Array<string>;
  admin: boolean;
  // add any other user properties here
}

const useAuth = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    const currentTime = Date.now() / 1000;

    if (token) {
      const decodedToken: any = jwtDecode(token);

      if (decodedToken.exp > currentTime) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        axios
          .get(process.env.AUTH_URL + '/verify')
          .then((res) => {
            if (res.status === 200) {
              setUser(res.data);
            } else {
              Cookies.remove('token');
              setUser(null);
              router.push('/login');
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        setUser(null);
        Cookies.remove('token');
      }
    } else {
      setUser(null);

      //redirect to login page
    }
  }, []);

  const isAuthenticated = !!user;

  return { user, isAuthenticated };
};

export default useAuth;
