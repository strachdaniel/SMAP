import { RecoilRoot, useRecoilSnapshot } from 'recoil';
import useAuth from '@/global/hooks/useAuth';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Login from './login';
import NavigationLayout from '@/global/UI/navigation/NavigatioLayout';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AuthWrapper>
        <NavigationLayout>
          <Component {...pageProps} />
        </NavigationLayout>
      </AuthWrapper>
    </RecoilRoot>
  );
}

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  // @ts-ignore
  const getLayout = children?.type?.getLayout || ((page: React.ReactNode) => page);

  return isAuthenticated ? getLayout(children) : <Login />;
}