import React, {useRef, useState} from 'react'
import { useEffect } from 'react';

interface useSlideProps {
    childRef: React.RefObject<HTMLDivElement> | undefined;
    childrenCount : number;
};

export function useSlide({childRef, childrenCount}: useSlideProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [sliderWidth, setSliderWidth] = useState<number>(0);
  const [childWidth, setChildWidth] = useState<number>(0);
  const [pages, setPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
      const width = sliderRef.current?.clientWidth;
      if(width)
        setSliderWidth(width);
  },[sliderRef]);

  useEffect(() => {
    const childWidthNew = childRef?.current?.clientWidth;
    if(childWidthNew && sliderWidth) {
        setPages(((childWidthNew+5) * childrenCount)/ sliderWidth );
        setChildWidth(childWidthNew);
    }
  },[sliderWidth, childRef]); 

  const scrollRight = () => {
    if(currentPage < pages)
    setCurrentPage(currentPage + 1);
    if(sliderRef.current)
        sliderRef.current.scrollLeft += (sliderWidth - sliderWidth/(childWidth+5)*5);
  };

  const scrollLeft = () => {
    if(currentPage > 1)
    setCurrentPage(currentPage - 1);
    if(sliderRef.current)
        sliderRef.current.scrollLeft -= (sliderWidth - sliderWidth/(childWidth+5)*5);
  };


  return {
      sliderRef,
      pages,
      currentPage,
      scrollRight,
      scrollLeft,
  }
}

