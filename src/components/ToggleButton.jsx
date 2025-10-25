import React, { useEffect, useState } from 'react';
import React from 'react';
import { Button, Badge } from '@heroui/react';
import { motion, AnimatePresence } from 'framer-motion';

const ToggleButton = ({ onClick, isCompleted, position = 'bottom-right', show = true }) => {
  const positionClasses = {
    'bottom-right': 'bottom-5 right-5',
    'bottom-left': 'bottom-5 left-5',
    'top-right': 'top-5 right-5',
    'top-left': 'top-5 left-5',
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: -180 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0, opacity: 0, rotate: 180 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`fixed z-[1000] ${positionClasses[position]}`}
        >
          <Badge
            content="New!"
            color="success"
            placement="top-right"
            isInvisible={isCompleted}
            shape="circle"
          >
            <motion.div
              animate={!isCompleted ? {
                boxShadow: [
                  "0 0 0 0 rgba(59, 130, 246, 0)",
                  "0 0 0 10px rgba(59, 130, 246, 0.2)",
                  "0 0 0 20px rgba(59, 130, 246, 0)",
                ]
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="rounded-full"
            >
              <Button
                isIconOnly
                color="primary"
                variant="shadow"
                size="lg"
                radius="full"
                onPress={onClick}
                className="w-14 h-14"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 22C8.4 22 7.9 21.8 7.4 21.4C7 21 6.8 20.5 6.8 20V10C6.8 9.5 7 9 7.4 8.6C7.8 8.2 8.3 8 8.8 8H9V6C9 4.7 9.5 3.5 10.4 2.6C11.3 1.7 12.5 1.2 13.8 1.2C15.1 1.2 16.3 1.7 17.2 2.6C18.1 3.5 18.6 4.7 18.6 6V8H18.8C19.3 8 19.8 8.2 20.2 8.6C20.6 9 20.8 9.5 20.8 10V20C20.8 20.5 20.6 21 20.2 21.4C19.8 21.8 19.3 22 18.8 22H9ZM11 8H16.6V6C16.6 5.2 16.3 4.5 15.8 4C15.3 3.5 14.6 3.2 13.8 3.2C13 3.2 12.3 3.5 11.8 4C11.3 4.5 11 5.2 11 6V8ZM9 20H18.8V10H9V20ZM14 17C14.6 17 15 16.8 15.4 16.4C15.8 16 16 15.5 16 15C16 14.4 15.8 14 15.4 13.6C15 13.2 14.5 13 14 13C13.4 13 13 13.2 12.6 13.6C12.2 14 12 14.5 12 15C12 15.6 12.2 16 12.6 16.4C13 16.8 13.5 17 14 17Z"
                    fill="currentColor"
                  />
                </svg>
              </Button>
            </motion.div>
          </Badge>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ToggleButton;