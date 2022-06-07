import Head from "next/head";
import { Card } from "../../components/home";
import { Navbar } from "../../components/layout";
import { redirectUser } from "../../helper";
import { getMyList } from "../../lib/tmdb";

import styles from '../../styles/MyList.module.css';


function MyList(props) {
  
    const {videos} = props;
  return (
    <div>
        <Navbar />
        <Head>
            <title>My list</title>
        </Head>
        <h1 className={styles.page_header}>My liked TV Shows & Movies</h1>
        <div className={styles.card_container}>
            
            {videos.map(video => (
                <div className={styles.mylistCard} key={video?.data?.id} >
                    <Card 
                        contentType={video.content_type} 
                        data={video?.data?.data} 
                        baseURL={video?.data?.baseURL}
                    />
                </div>
            ))}
        </div>
    </div>
  )
}


export async function  getServerSideProps(context) {
    const { userId, token } = await redirectUser(context);
    if(!token)
        return {
        redirect: {
        permanent: false,
        destination: "/login",
        },
        props:{},
    };
    
    const videos = await getMyList(userId, token);

    

    return {
        props: {
           videos :  videos ? videos : {}
        }
    };

}

export default MyList;