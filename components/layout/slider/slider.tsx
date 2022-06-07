import cls from 'classnames'

import Image from 'next/image';
import { useSlide } from '../../../hook';
import {useRef, useEffect} from 'react';
import { Card } from '../../home';
import styles from './slider.module.css';
import SliderButton from './slider_button';
import SliderPgination from './slider-pagination';

interface SliderProps {
    title: string,
    isDisplayedAtTop?: boolean,
    data: any[],
    baseURL: string,
    contentType?: "movie" | "tv"
}


function Slider(props: SliderProps) {

    const {title, isDisplayedAtTop = false, data, baseURL, videoType, contentType} = props;
    const childRef = useRef<HTMLDivElement>(null);

    const {
        sliderRef,
        pages,
        currentPage,
        scrollRight,
        scrollLeft,
    } = useSlide({childRef, childrenCount : data.length});
    
    const handleScroll=() => {

    };
    
    
    return (
    <div 
        className={cls(styles.category, isDisplayedAtTop && styles.first_category)}
        
    >
        <h3 className={styles.header}>
            {title}
            <SliderPgination pages={pages} currentPage={currentPage}/>
        </h3>
        <div className={styles.slider_container}>

            <div className={styles.slider} ref={sliderRef}>
                {data.map((item, indx: number) =>{
                   return <Card contentType={contentType} data={item} index={indx+1} key={indx} Fer={childRef} baseURL={baseURL}/>
                })}
            </div>
            <SliderButton hideSliderButton={currentPage === 1} type="left" onClick={scrollLeft}/>
            <SliderButton hideSliderButton={currentPage === Math.ceil(pages)} type="right" onClick={scrollRight}/>
            
        </div>
        
    </div>
  )
}

export default Slider;