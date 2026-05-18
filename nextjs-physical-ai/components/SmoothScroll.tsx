"use client";

import { useEffect, useRef } from 'react';

const SmoothScroll = () => {
  const isMoving = useRef(false);
  const currentIdx = useRef(0);

  useEffect(() => {
    if (window.innerWidth <= 1024) return;

    const sections = document.querySelectorAll('main > section');
    if (sections.length === 0) return;

    const animateScroll = (targetTop: number) => {
      isMoving.current = true;
      const startPos = window.pageYOffset;
      const distance = targetTop - startPos;
      const duration = 600; // Faster glide
      let start: number | null = null;

      function step(currentTime: number) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Faster Quadratic Easing
        const ease = progress < 0.5 
          ? 2 * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        window.scrollTo(0, startPos + distance * ease);

        if (timeElapsed < duration) {
          requestAnimationFrame(step);
        } else {
          isMoving.current = false;
        }
      }
      requestAnimationFrame(step);
    };

    const handleWheel = (e: WheelEvent) => {
      if (isMoving.current) return;
      
      if (Math.abs(e.deltaY) < 15) return; // Lower threshold

      if (e.deltaY > 0) {
        if (currentIdx.current < sections.length - 1) {
          e.preventDefault();
          currentIdx.current++;
          animateScroll((sections[currentIdx.current] as HTMLElement).offsetTop);
        }
      } else {
        if (currentIdx.current > 0) {
          e.preventDefault();
          currentIdx.current--;
          animateScroll((sections[currentIdx.current] as HTMLElement).offsetTop);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    // Sync index on manual scroll 
    const handleScroll = () => {
      if (isMoving.current) return;
      const currentPos = window.pageYOffset + (window.innerHeight / 3);
      sections.forEach((sec, i) => {
        const top = (sec as HTMLElement).offsetTop;
        if (currentPos >= top && currentPos < top + (sec as HTMLElement).offsetHeight) {
          currentIdx.current = i;
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null;
};

export default SmoothScroll;
