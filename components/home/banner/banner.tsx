import Image from 'next/image';
import React from 'react'
import { BackGroundImage } from '../../layout';
import styles from './banner.module.css';

interface BannerProps {
    data: any
}


function Banner(props:BannerProps) {
    const { subtitle, imgUrl, data} = props;
    const imagePath = data.backdrop_path ? data.backdrop_path : data.poster_path
    const title = data.title ? data.title : data.name
    const description = data.overview
  return (
    <div className={styles.container}>
        <div className={styles.leftWrapper}>
            <div className={styles.left}>
                <div className={styles.nseriesWrapper}>
                    <p className={styles.firstLetter}>N</p>
                    <p className={styles.series}>S E R I E S</p>
                </div>
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.subTitle}>{description}</p>
                <div className={styles.playBtnWrapper}>
                    <button className={styles.btnWithIcon}>
                        <Image
                            src="/svg/play_arrow.svg"
                            alt="Play icon"
                            width="34px"
                            height="34px"
                        />
                        <span className={styles.playText}>Play</span>
                    </button>
                </div>
            </div>
            
        </div>
       
        <BackGroundImage imgUrl={`https://image.tmdb.org/t/p/original${imagePath}`} />
    </div>
  )
}

export default Banner