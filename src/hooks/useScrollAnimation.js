import { useEffect, useState } from 'react';
import { useMotionValue, useTransform } from 'framer-motion';

export const useScrollAnimation = () => {
  const [scrollY, setScrollY] = useState(0);
  const scrollYMotion = useMotionValue(0);
  
  // Transform values for parallax effects
  const parallaxY = useTransform(scrollYMotion, [0, 500], [0, -50]);
  const opacity = useTransform(scrollYMotion, [0, 200], [1, 0]);
  const scale = useTransform(scrollYMotion, [0, 300], [1, 0.8]);

  useEffect(() => {
    const handleScroll = () => {
      const newScrollY = window.scrollY;
      setScrollY(newScrollY);
      scrollYMotion.set(newScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: false });
    handleScroll(); // Initial value

    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollYMotion]);

  return {
    scrollY,
    scrollYMotion,
    parallaxY,
    opacity,
    scale,
  };
};

export const useElementInView = (ref, options = {}) => {
  const [isInView, setIsInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting && !hasBeenInView) {
          setHasBeenInView(true);
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px',
      }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options.threshold, options.rootMargin, hasBeenInView]);

  return { isInView, hasBeenInView };
};