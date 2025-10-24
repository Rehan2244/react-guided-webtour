import { Card, CardHeader, CardBody, CardFooter, Button, ButtonGroup, Chip } from '@heroui/react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useState, useEffect } from 'react';

const CustomTooltipExample = ({
  step,
  currentStep,
  totalSteps,
  targetRect,
  onNext,
  onPrev,
  onSkip,
  goToStep,
  isFirstStep,
  isLastStep,
}) => {
  const [position, setPosition] = useState({ top: 100, left: 100 });
  const [placement, setPlacement] = useState('bottom');

  useEffect(() => {
    if (!targetRect) {
      setPosition({ top: 100, left: 100 });
      return;
    }

    const calculatePosition = () => {
      const tooltipWidth = 400;
      const tooltipHeight = 250;
      const padding = 24;
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
        top = targetRect.top - tooltipHeight + 20;
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
  }, [targetRect]);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25
      }}
      className="fixed z-[9999]"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: '400px',
      }}
    >
      <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-2xl">
        <CardHeader className="flex justify-between items-center pb-2">
          <h3 className="text-xl font-bold">{step.title}</h3>
          <div className="flex gap-2">
            <Chip size="sm" color="warning" variant="shadow">
              Step {currentStep + 1} of {totalSteps}
            </Chip>
          </div>
        </CardHeader>

        <CardBody className="py-4">
          <p className="text-white/90">{step.content}</p>

          {/* Step indicators */}
          <div className="flex gap-1 mt-4">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToStep(index)}
                className={`h-2 rounded-full transition-all ${index === currentStep
                  ? 'w-8 bg-white'
                  : index < currentStep
                    ? 'w-2 bg-white/60'
                    : 'w-2 bg-white/30'
                  }`}
              />
            ))}
          </div>
        </CardBody>

        <CardFooter className="flex justify-between items-center pt-2">
          <Button
            size="sm"
            variant="light"
            onPress={onSkip}
            className="text-white/70 hover:text-white"
          >
            Exit Tour
          </Button>

          <ButtonGroup size="sm">
            {!isFirstStep && (
              <Button
                variant="flat"
                onPress={onPrev}
                className="bg-white/20 text-white"
              >
                ← Back
              </Button>
            )}
            <Button
              color="warning"
              variant="shadow"
              onPress={onNext}
              className="font-semibold"
            >
              {isLastStep ? 'Complete ✓' : 'Next →'}
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>

      {/* Custom arrow */}
      <div 
        className={clsx(
          'absolute w-0 h-0',
          {
            // Arrow pointing down (tooltip is above target)
            'top-full left-1/2 -translate-x-1/2': placement === 'top',
            // Arrow pointing up (tooltip is below target)
            'bottom-full left-1/2 -translate-x-1/2': placement === 'bottom',
            // Arrow pointing left (tooltip is on the right of target)
            'left-full top-1/2 -translate-y-1/2': placement === 'right',
            // Arrow pointing right (tooltip is on the left of target)
            'right-full top-1/2 -translate-y-1/2': placement === 'left',
          }
        )}
        style={{
          ...(placement === 'bottom' && {
            borderLeft: '12px solid transparent',
            borderRight: '12px solid transparent',
            borderBottom: '12px solid #a855f7',
          }),
          ...(placement === 'top' && {
            borderLeft: '12px solid transparent',
            borderRight: '12px solid transparent',
            borderTop: '12px solid #a855f7',
          }),
          ...(placement === 'left' && {
            borderTop: '12px solid transparent',
            borderBottom: '12px solid transparent',
            borderRight: '12px solid #a855f7',
          }),
          ...(placement === 'right' && {
            borderTop: '12px solid transparent',
            borderBottom: '12px solid transparent',
            borderLeft: '12px solid #a855f7',
          }),
        }}
      />
    </motion.div>
  );
};

export default CustomTooltipExample;