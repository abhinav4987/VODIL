import '../styles/globals.css'
import {
  RecoilRoot,
} from 'recoil';

import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { magic } from '../lib/magic-cllient';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Loading } from '../components/layout';



function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isLoading, setIsloading] = useState(true);

   useEffect(() => {
    const handleCompleteEventHandler = () => {
        setIsloading(false);
    };
    router.events.on('routeChangeComplete',handleCompleteEventHandler);
    router.events.on('routeChangeError',handleCompleteEventHandler);
    
    return () => {
        router.events.off('routeChangeComplete',handleCompleteEventHandler);
        router.events.on('routeChangeError',handleCompleteEventHandler);
    };
  },[router]);
   
  useEffect(()=> {
    async function initialRoute() {
      const isLoggedIn = await magic.user.isLoggedIn();
      if (!isLoggedIn) {
        router.push('/login');
      } else {
        setIsloading(false);
      };
    };

    initialRoute();
  },[]);

  return (
    <RecoilRoot>
      {isLoading ? <Loading /> : <Component {...pageProps} />}
    </RecoilRoot>
  )
}

export default MyApp
