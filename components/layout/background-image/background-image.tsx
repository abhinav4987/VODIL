import cls from 'classnames';
import Image from 'next/image';
import styles from './backgroundImage.module.css';


interface BackgroundImageProps {
    imgUrl: string
    zoomOnHover?: boolean
    applyGradient?: boolean
}


function BackgroundImage(props:BackgroundImageProps) {
  const { imgUrl, zoomOnHover = true, applyGradient = true} = props;

  return (
    <div className={cls(styles.imageBackground,zoomOnHover && styles.hover)}>
        <div className={styles.imageWrapper}>
            <Image
              className={styles.image}
                src={imgUrl}
                alt="movie and TV shows"
                layout="fill"
                objectFit="cover"
            />
        </div>
        {applyGradient && <div className={styles.gradient}/>}
        
    </div>
  )
}

export default BackgroundImage