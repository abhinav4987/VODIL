import cls from 'classnames'
import Image from 'next/image';
import _ from 'lodash';
import styles from './slider.module.css';
import { useCallback } from 'react';

interface SliderButtonProps {
    type : "right" | "left",
    onClick: Function,
    hideSliderButton :boolean
};

function SliderButton(props: SliderButtonProps) {
    
    const {type, onClick, hideSliderButton} = props;
    const imageSource = type === "right" ? '/svg/arrow_right_light.svg' : '/svg/arrow_left_light.svg'
    const handleClass = cls (
        type==="right" ? styles.right_handle : styles.left_handle,
        styles.handle
    );

    const imageClass = cls (
        type==="right" ? styles.arrow_right : styles.arrow_left,
        styles.arrow
    )
    
    const clickHandler = () => {
        onClick();
    };
    
    const throttledhandler = _.debounce(clickHandler,500);
    

    return (
    <div 
        className={cls(handleClass, hideSliderButton && styles.hideButton )} 
        onClick={throttledhandler}
    >
        <Image 
            className={imageClass}
            src={imageSource} 
            height={'50px'} 
            width={'30px'} 
            alt='arrow'
        />
    </div>
  )
}

export default SliderButton