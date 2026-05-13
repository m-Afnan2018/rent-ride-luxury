'use client';

import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import styles from './Slider.module.css';

export interface SliderRef {
  scrollNext: () => void;
  scrollPrev: () => void;
}

interface SliderProps {
  children: React.ReactNode;
  className?: string;
  gap?: number;
  paddingLeft?: string | number;
}

const Slider = forwardRef<SliderRef, SliderProps>(({ children, className = '', gap = 24, paddingLeft = 0 }, ref) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    scrollNext: () => {
      if (scrollRef.current) {
        const itemWidth = scrollRef.current.firstElementChild?.clientWidth || 300;
        scrollRef.current.scrollBy({ left: itemWidth + gap, behavior: 'smooth' });
      }
    },
    scrollPrev: () => {
      if (scrollRef.current) {
        const itemWidth = scrollRef.current.firstElementChild?.clientWidth || 300;
        scrollRef.current.scrollBy({ left: -(itemWidth + gap), behavior: 'smooth' });
      }
    }
  }));

  return (
    <div className={`${styles.sliderContainer} ${className}`}>
      <div 
        className={styles.sliderTrack} 
        ref={scrollRef}
        style={{ 
          gap: `${gap}px`,
          paddingLeft: paddingLeft,
          paddingRight: paddingLeft // ensure symmetry at the end
        }}
      >
        {children}
      </div>
    </div>
  );
});

Slider.displayName = 'Slider';
export default Slider;
