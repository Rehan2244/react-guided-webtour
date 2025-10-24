export const scrollToElement = (element, options = {}) => {
  const {
    offset = 100,
    duration = 800,
    easing = 'easeInOutCubic',
  } = options;

  const targetPosition = element.getBoundingClientRect().top + window.scrollY - offset;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  const startTime = performance.now();

  const easingFunctions = {
    linear: (t) => t,
    easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    easeOutExpo: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
    easeInOutQuint: (t) => t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2,
  };

  const easingFunction = easingFunctions[easing] || easingFunctions.easeInOutCubic;

  const scrollAnimation = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easingFunction(progress);
    
    window.scrollTo(0, startPosition + distance * easedProgress);

    if (progress < 1) {
      requestAnimationFrame(scrollAnimation);
    }
  };

  requestAnimationFrame(scrollAnimation);
};

export const isElementInViewport = (element, offset = 100) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= offset &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};