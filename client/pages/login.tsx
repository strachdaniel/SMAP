import Input from '@/components/Generic/Input';
import Image from 'next/image';
import Link from 'next/link';
import GoogleIcon from '../public/icons/google.svg';
import PrimaryButton from '@/components/UI/Buttons/PrimaryButton';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRecoilState } from 'recoil';
import { userAtom } from '@/global/stores/userAtom';
import axios from 'axios';

const AUTH_URL = process.env['AUTH_URL'];

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userAtom);

  useEffect(() => {
    if (router.query.token) {
      const token = router.query.token as string;

      Cookies.set('token', token, { httponly: false, expires: 7 });
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.get(process.env.AUTH_URL + '/verify').then((res) => {
        setUser(res.data);
        router.push('/');
      });
    }
  }, [router.query]);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="bg-white shadow-custom rounded-lg p-10 flex flex-col justify-center items-center">
        <h1>PŘIHLÁŠENÍ</h1>
        <div>
          <Input name="email" title="Email" placeholder="Email" type="email" />
        </div>
        <div>
          <Input name="password" title="Heslo" placeholder="Heslo" type="password" />
        </div>
        <PrimaryButton onClick={() => {}}>
          <p>Prihlasit</p>
        </PrimaryButton>
        <div className="shadow-custom p-2 w-14 rounded-2xl mt-5">
          <Link href={`${AUTH_URL}/google`}>
            <div className="flex flex-col justify-center items-center">
              <Image alt="Google prihlaseni" src={GoogleIcon} width={50} height={50} />
              <p>Školní účet</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
