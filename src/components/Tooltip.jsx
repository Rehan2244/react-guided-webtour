import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button, Progress, Chip } from '@heroui/react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

const Tooltip = ({
  step,
  currentStep,
  totalSteps,
  targetRect,
  onNext,
  onPrev,
  onSkip,
  isFirstStep,
  isLastStep,
  theme = 'light',
}) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [placement, setPlacement] = useState('bottom');

  useEffect(() => {
    if (!targetRect || !step) return;

    const calculatePosition = () => {
      const tooltipWidth = 360;
      const tooltipHeight = 200;
      const padding = 20;
      const viewportPadding = 10;

      let top = 0;
      let left = 0;
      let bestPlacement = 'bottom';

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Try bottom placement
      if (targetRect.bottom + tooltipHeight + padding < viewportHeight) {
        top = targetRect.bottom + padding;
        left = targetRect.left + targetRect.width / 2 - tooltipWidth / 2;
        bestPlacement = 'bottom';
      }
      // Try top placement
      else if (targetRect.top - tooltipHeight - padding > 0) {
        top = targetRect.top - tooltipHeight - padding;
        left = targetRect.left + targetRect.width / 2 - tooltipWidth / 2;
        bestPlacement = 'top';
      }
      // Try right placement
      else if (targetRect.right + tooltipWidth + padding < viewportWidth) {
        top = targetRect.top + targetRect.height / 2 - tooltipHeight / 2;
        left = targetRect.right + padding;
        bestPlacement = 'right';
      }
      // Try left placement
      else if (targetRect.left - tooltipWidth - padding > 0) {
        top = targetRect.top + targetRect.height / 2 - tooltipHeight / 2;
        left = targetRect.left - tooltipWidth - padding;
        bestPlacement = 'left';
      }
      // Default to center of viewport
      else {
        top = viewportHeight / 2 - tooltipHeight / 2;
        left = viewportWidth / 2 - tooltipWidth / 2;
        bestPlacement = 'center';
      }

      // Ensure tooltip stays within viewport
      left = Math.max(viewportPadding, Math.min(left, viewportWidth - tooltipWidth - viewportPadding));
      top = Math.max(viewportPadding, Math.min(top, viewportHeight - tooltipHeight - viewportPadding));

      setPosition({ top, left });
      setPlacement(bestPlacement);
    };

    calculatePosition();
    window.addEventListener('resize', calculatePosition);
    window.addEventListener('scroll', calculatePosition);

    return () => {
      window.removeEventListener('resize', calculatePosition);
      window.removeEventListener('scroll', calculatePosition);
    };
  }, [targetRect, step]);

  if (!step) return null;

  const progress = ((currentStep + 1) / totalSteps) * 100;

  const getMotionVariants = () => {
    const baseVariants = {
      initial: { opacity: 0, scale: 0.85 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.85 }
    };

    const directionalVariants = {
      bottom: {
        initial: { ...baseVariants.initial, y: -20 },
        animate: { ...baseVariants.animate, y: 0 },
        exit: { ...baseVariants.exit, y: -20 }
      },
      top: {
        initial: { ...baseVariants.initial, y: 20 },
        animate: { ...baseVariants.animate, y: 0 },
        exit: { ...baseVariants.exit, y: 20 }
      },
      left: {
        initial: { ...baseVariants.initial, x: 20 },
        animate: { ...baseVariants.animate, x: 0 },
        exit: { ...baseVariants.exit, x: 20 }
      },
      right: {
        initial: { ...baseVariants.initial, x: -20 },
        animate: { ...baseVariants.animate, x: 0 },
        exit: { ...baseVariants.exit, x: -20 }
      },
      center: baseVariants
    };

    return directionalVariants[placement] || baseVariants;
  };

  const variants = getMotionVariants();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStep}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        transition={{ 
          type: "spring",
          stiffness: 400,
          damping: 30,
          mass: 0.8
        }}
        className="fixed z-[9999]"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          width: '360px',
        }}
      >
        <Card
          className={clsx(
            'shadow-2xl',
            theme === 'dark' ? 'dark bg-gray-800' : 'bg-white'
          )}
        >
          <CardHeader className="flex justify-between items-center pb-2">
            <h3 className="text-lg font-semibold">{step.title}</h3>
            <Chip size="sm" variant="flat" color="primary">
              {currentStep + 1} / {totalSteps}
            </Chip>
          </CardHeader>
          
          <CardBody className="py-2">
            <p className="text-default-600">{step.content}</p>
            {step.media && (
              <div className="mt-3">
                {step.media.type === 'image' && (
                  <img
                    src={step.media.url}
                    alt={step.media.alt || 'Tour media'}
                    className="rounded-lg w-full"
                  />
                )}
                {step.media.type === 'video' && (
                  <video
                    src={step.media.url}
                    controls
                    className="rounded-lg w-full"
                  />
                )}
              </div>
            )}
          </CardBody>
          
          <CardFooter className="flex flex-col gap-3">
            <Progress
              size="sm"
              value={progress}
              color="primary"
              className="w-full"
            />
            
            <div className="flex justify-between items-center w-full">
              <Button
                size="sm"
                variant="light"
                onPress={onSkip}
                className="text-default-500"
              >
                Skip tour
              </Button>
              
              <div className="flex gap-2">
                {!isFirstStep && (
                  <Button
                    size="sm"
                    variant="flat"
                    onPress={onPrev}
                  >
                    Previous
                  </Button>
                )}
                <Button
                  size="sm"
                  color="primary"
                  onPress={onNext}
                >
                  {isLastStep ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
        
        {/* Arrow pointer */}
        <div
          className={clsx(
            'absolute w-0 h-0',
            theme === 'dark' ? 'border-gray-800' : 'border-white',
            {
              // Arrow pointing up (tooltip is below target)
              'top-full left-1/2 -translate-x-1/2 border-l-[10px] border-r-[10px] border-t-[10px] border-l-transparent border-r-transparent':
                placement === 'top',
              // Arrow pointing down (tooltip is above target)
              'bottom-full left-1/2 -translate-x-1/2 border-l-[10px] border-r-[10px] border-b-[10px] border-l-transparent border-r-transparent':
                placement === 'bottom',
              // Arrow pointing left (tooltip is on the right of target)
              'left-full top-1/2 -translate-y-1/2 border-t-[10px] border-b-[10px] border-l-[10px] border-t-transparent border-b-transparent':
                placement === 'right',
              // Arrow pointing right (tooltip is on the left of target)
              'right-full top-1/2 -translate-y-1/2 border-t-[10px] border-b-[10px] border-r-[10px] border-t-transparent border-b-transparent':
                placement === 'left',
            }
          )}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default Tooltip;