
import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  startDelay?: number;
  shouldStart?: boolean;
  className?: string;
  speed?: number;
  onComplete?: () => void;
}

export const Typewriter: React.FC<TypewriterProps> = ({ 
  text, 
  startDelay = 0, 
  shouldStart = true, 
  className = "", 
  speed = 10, 
  onComplete 
}) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (!shouldStart) return;

    const timeout = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
          if (currentIndex > text.length && onComplete) onComplete();
        } else {
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(timeout);
  }, [text, startDelay, shouldStart, speed, onComplete]);

  return <span className={className}>{displayText}</span>;
};
