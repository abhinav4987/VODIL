import Image from 'next/image';
import styles from './Card.module.css'
import cls from 'classnames';
import { useState } from 'react';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { VideoState, contentTypeAtom } from '../../../atom/video-stom';



interface CardProps {
    size?: "large" | "mideum" | "small"
    imgURL?: string
    index?: number,
    Fer?:React.RefObject<HTMLDivElement>,
    data: any
    baseURL: string
    contentType?: "movie" | "tv"
};

const Card = (props: CardProps) => {
    
    const [showInfo, setShowInfo] = useState(false); 
    const [video, setVideo] = useRecoilState(VideoState);
    const [contentTypeState, setContentTypeState] = useRecoilState(contentTypeAtom)
    const {size, imgURL, Fer, index = 2, data, baseURL, contentType } = props;
    const imagePath = data.backdrop_path ? data.backdrop_path : data.poster_path
    const onMouseEnteronCard = () => {
        setShowInfo(true);
    }

    const onMouseLeaveonCard = () => {
        setShowInfo(false);
    }
    const handleClick = () =>{
        setVideo(data);
        setContentTypeState(contentType);
    }
  return (
    <Link href={`/${data.id}`}>
        <div 
            id={'card'} 
            onClick={handleClick}
            className={cls(styles.card,index === 1 && styles.firstcard)} 
            onMouseEnter={onMouseEnteronCard} 
            onMouseLeave={onMouseLeaveonCard}
            ref={Fer}
        >
            
            <Image
                className={styles.image}
                src={`https://image.tmdb.org/t/p/original${imagePath}`}
                alt="movie and TV shows"
                width="300px"
                height="150px"  
            />
            
            {/* construct component for certificate, duration, genre */}
            
            {false && (
            <section className={styles.information} id={'information'}>
                <div className={styles.icons_row}>
                    <div className={styles.left_icon}>
                        <div className={cls(styles.play_icon, styles.icon,)}>
                            <Image 
                                src={'/svg/play_arrow.svg'}
                                width="28px"
                                height="28px"
                                alt="play"
                            />
                        </div>
                        <div className={cls(styles.add_icon, styles.icon)}>
                            <Image 
                                
                                src={'/svg/add_light.svg'}
                                width="30px"
                                height="24px"
                                alt="play"
                            />
                        </div>
                    </div>
                    <div className={styles.right_icon}>
                        <div className={styles.info_icon}>
                            <Image 
                                src={'/svg/info_light.svg'}
                                width="34px"
                                height="34px"
                                alt="play"
                            />
                        </div>
                    </div>
                </div>

                <h2 className={styles.movie_title}>The Room</h2>

                <div className={styles.metadata}>
                    <span className={styles.certification}>A</span>
                    <span className={styles.duration}>2.5 hr</span>
                </div>

                <div className={styles.genre_row}>
                    <div className={styles.genre}>
                        <span className={styles.genre_text}>Comedy</span>
                        <Image 
                            src={'/svg/dot.svg'}
                            alt="movie and TV shows"
                            width="7px"
                            height="7px" 
                        />
                    </div>
                    <div className={styles.genre}>
                        <span className={styles.genre_text}>Comedy</span>
                        <Image 
                            className={styles.dot}
                            src={'/svg/dot.svg'}
                            alt="movie and TV shows"
                            width="7px"
                            height="7px" 
                        />
                    </div>
                </div>
            </section>)}
        </div>
    </Link>
  )
}

export default Card