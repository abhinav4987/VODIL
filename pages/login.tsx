import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Input } from '../components/auth';
import { BackGroundImage } from '../components/layout';
import { magic } from '../lib/magic-cllient';
import styles from '../styles/Login.module.css';
import { useEffect } from 'react';



function Login() {

  
  const [email, setEmail] = useState('');
  const [validationError, setValidationError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();  
  
  useEffect(() => {
    const handleCompleteEventHandler = () => {
        setLoading(false);
    };
    router.events.on('routeChangeComplete',handleCompleteEventHandler);
    router.events.on('routeChangeError',handleCompleteEventHandler);
    
    return () => {
        router.events.off('routeChangeComplete',handleCompleteEventHandler);
        router.events.on('routeChangeError',handleCompleteEventHandler);
    };
  },[router]);


  const onSubmit = async () => {
      if(true) {
        if(validationError !== '')  setValidationError('');
        try {
            setLoading(true)
            let didToken = await magic.auth.loginWithMagicLink({email});
            if(didToken) {
                const response = await fetch('/api/login', {
                    method: 'POST', 
                    headers: {
                        'Authorization': `Barer ${didToken}`,
                        'Content-Type': 'application/json'
                    }
                })
                const loggedInRes = await response.json();
                if(loggedInRes) 
                router.push('/')
            }
        } catch (error) {
            if(error)
            console.log(error);
        }
      } else {
          setValidationError('Enter valid email');
      }

  }

  return (
    <div className={styles.container}>
        <Head>
            <title>Login</title>
        </Head>
        <BackGroundImage zoomOnHover={false} applyGradient={false} imgUrl={'/img/netflix-background.jpg'}/>
        <div className={styles.main}>
                <div className={styles.header}>
                    <Image
                        src="/svg/netflix.svg"
                        alt="Netflix logo"
                        width="188px"
                        height="54px"
                    />
                </div>
                <div className={styles.form}>
                    <h2 className={styles.signin}>Sign In</h2>
                    <Input type="email" value={email} onChange={setEmail} error={validationError} placeholder={"Enter your Email"}/>
                    <button className={styles.login_button} onClick={onSubmit}>
                        {loading ? "Loading..." : "Login"}
                    </button>
                </div>
        </div>
    </div>
  )
}

export default Login;