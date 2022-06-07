/* eslint-disable @next/next/no-html-link-for-pages */
import Image from 'next/image';
import {useState} from 'react';
import { useRouter } from "next/router";
import Link from "next/link";
import styles from './navbar.module.css';
import { useEffect } from 'react';
import { magic } from '../../../lib/magic-cllient';



function Navbar() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [email, setEmail] = useState('');
    const router = useRouter();

    useEffect(() => {
        async function fetchEmail(){try {
            const { email, publicAddress } = await magic.user.getMetadata();
            const didToken = await magic.user.getIdToken();
            setEmail(email);
        } catch {
        // Handle errors if required!
        }}

        fetchEmail();
    },[]);

    const signout = async () => {
        await magic.user.logout();
        router.push('/login');
        
    }

    const toggleSignOut = () => {
        setShowDropdown(!showDropdown);
    }

    

  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <a className={styles.logoLink} href="/">
                <div className={styles.logoWrapper}>
                    <Image
                        src="/svg/netflix.svg"
                        alt="Netflix logo"
                        width="168px"
                        height="54px"
                    />
                </div>
            </a>
            
            <ul className={styles.navItems}>
                <Link href={'/'}>
                    <li className={styles.navItem} >Home</li>
                </Link>
                <Link href={'/browse/movie'}>
                    <li className={styles.navItem} >Movie</li>
                </Link>
                <Link href={'/browse/tv'}>
                    <li className={styles.navItem} >TV shows</li>
                </Link>
                <Link href={'/browse/my-list'}>
                    <li className={styles.navItem} >My list</li>
                </Link>
                
                
                
                
                
            </ul>
            <nav className={styles.navContainer}>
                <div>
                    <button className={styles.usernameBtn}  onClick={toggleSignOut}>
                        {email && <p className={styles.username}>{email && email[0].toLocaleUpperCase()}</p>}
                    </button>
                    {showDropdown && (
                        <div className={styles.navDropdown} onClick={toggleSignOut}>
                            <div>
                            <Link href="/login">
                                <a className={styles.linkName} >
                                    Sign out
                                </a>
                            </Link>
                            <div className={styles.lineWrapper}></div>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </div>
       
    </div>
  )
}

export default Navbar