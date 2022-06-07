import Head from 'next/head';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil'
import { contentTypeAtom, VideoState } from '../atom/video-stom'
import { Dislike, Like } from '../components/icons';
import { Loading, Navbar } from '../components/layout';
import { redirectUser } from '../helper';
import { get_videoData } from '../lib/youtube';
import styles from '../styles/Video.module.css';


function Video() {
  const video = useRecoilValue(VideoState);
  const { overview, id} = video;
  const title = video.title ? video.title : video.name
  const [loading, setLoading] = useState(true);
  const [videoData, setVideoData] = useState(); 
  const contentType = useRecoilValue(contentTypeAtom)
  const [toggleLike, setToggleLike] = useState(false);
  const [toggleDisLike, setToggleDisLike] = useState(false);
  
  useEffect(() => {
      async function getData() {
        const data = await get_videoData(title+" trailer");
        setVideoData(data);
        setLoading(false);
      }
      getData();
    
  },[]);

   const runRatingService = async (favourited) => {
    return await fetch("/api/stats", {
      method: "POST",
      body: JSON.stringify({
        videoId: id,
        videoType: contentType,
        favourited,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const handleToggleDislike = async () => {
    setToggleDisLike(!toggleDisLike);
    setToggleLike(toggleDisLike);

    const val = !toggleDisLike;
    const favourited = val ? 0 : 1;
    await runRatingService(favourited);
  };

  const handleToggleLike = async () => {
    const val = !toggleLike;
    setToggleLike(val);
    setToggleDisLike(toggleLike);

    const favourited = val ? 1 : 0;
    await runRatingService(favourited);
  };

  return loading ? <Loading /> :(
    <div className={styles.container}>
        <Head>
            <title>{title}</title>
        </Head>
        <Navbar />
        <div className={styles.main}>
            
        </div>
        <div className={styles.video_container}>
                <iframe
                    id="ytplayer"
                    className={styles.videoPlayer}
                    type="text/html"
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoData.id.videoId}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
                    frameBorder="0"
                ></iframe>
        </div>
        <div className={styles.buttonRow}>
          <button onClick={handleToggleLike}>
            <div className={styles.btnWrapper}>
              <Like fill={"green"} selected={toggleLike} />
            </div>
          </button>
          <button onClick={handleToggleDislike}>
            <div className={styles.btnWrapper}>
              <Dislike fill={"red"} selected={toggleDisLike} />
            </div>
          </button>
        </div>

        <div className={styles.info}>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.description}>{overview}</p>
        </div>
        
        
    </div>
  )
}


export async function getServerSideProps(context) {
  const {userId, token} = await redirectUser(context)
  if(!token)
    return {
    redirect: {
      permanent: false,
      destination: "/login",
    },
    props:{},
  };

  return {
    props: {}
  }
}
export default Video