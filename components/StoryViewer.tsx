import React, { useState, useEffect, useRef } from 'react';
import { Story } from '../types';
import { CloseIcon } from './icons/CloseIcon';
import { MoreIcon } from './icons/MoreIcon';
import { SendIcon } from './icons/SendIcon';
import { HeartIcon } from './icons/HeartIcon';

interface StoryViewerProps {
  stories: Story[];
  initialStoryId: number;
  onClose: () => void;
}

const StoryViewer: React.FC<StoryViewerProps> = ({ stories, initialStoryId, onClose }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(() => {
    const index = stories.findIndex(s => s.id === initialStoryId);
    return index !== -1 ? index : 0;
  });
  const [progress, setProgress] = useState(0);
  // Fix: Use ReturnType<typeof setInterval> for the correct timer ID type in a browser environment, instead of NodeJS.Timeout.
  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const storyDuration = 5000; // 5 seconds per story

  useEffect(() => {
    const startTimer = () => {
      setProgress(0);
      const startTime = Date.now();
      timerRef.current = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const newProgress = (elapsedTime / storyDuration) * 100;
        if (newProgress >= 100) {
          goToNextStory();
        } else {
          setProgress(newProgress);
        }
      }, 50);
    };

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    startTimer();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentStoryIndex, stories]);

  const goToNextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else {
      onClose();
    }
  };

  const goToPreviousStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    }
  };

  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, currentTarget } = e;
    const { offsetWidth } = currentTarget;
    const tapPosition = clientX / offsetWidth;

    if (tapPosition < 0.3) {
      goToPreviousStory();
    } else {
      goToNextStory();
    }
  };

  const currentStory = stories[currentStoryIndex];
  if (!currentStory) return null;

  return (
    <div className="fixed inset-0 bg-dark z-50 flex flex-col p-4 animate-fade-in">
      {/* Progress Bars */}
      <div className="flex space-x-1 space-x-reverse absolute top-4 left-4 right-4 z-20">
        {stories.map((_, index) => (
          <div key={index} className="flex-1 h-1 bg-white/30 rounded-full">
            <div
              className="h-full bg-white rounded-full"
              style={{
                width: `${index < currentStoryIndex ? 100 : index === currentStoryIndex ? progress : 0}%`,
                transition: index === currentStoryIndex ? 'width 50ms linear' : 'none',
              }}
            ></div>
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="flex justify-between items-center text-white z-20 mt-6">
        <div className="flex items-center space-x-reverse space-x-3">
          <img src={currentStory.user.avatar} alt={currentStory.user.username} className="w-10 h-10 rounded-full" />
          <span className="font-bold">{currentStory.user.username}</span>
        </div>
        <div className="flex items-center space-x-reverse space-x-2">
            <button className="p-2"><MoreIcon/></button>
            <button onClick={onClose} className="p-2"><CloseIcon /></button>
        </div>
      </div>
      
      {/* Media */}
      <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden rounded-lg">
        <img src={currentStory.mediaUrl} alt="Story content" className="w-full h-full object-cover" />
        <div className="absolute inset-0" onClick={handleTap}></div>
      </div>

      {/* Footer */}
      <div className="flex items-center space-x-reverse space-x-4 z-20">
        <input 
          type="text" 
          placeholder="أرسل رسالة..."
          className="flex-1 bg-white/20 border-2 border-white/30 rounded-full py-2 px-4 placeholder-white/70 focus:outline-none focus:border-white"
        />
        <button className="text-white"><HeartIcon /></button>
        <button className="text-white"><SendIcon /></button>
      </div>

      <style>{`
        .animate-fade-in { animation: fadeIn 0.3s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
};

export default StoryViewer;