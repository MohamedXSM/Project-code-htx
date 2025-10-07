import React from 'react';
import { Story, User } from '../types';
import { PlusIcon } from './icons/PlusIcon';

interface StoryReelProps {
  stories: Story[];
  onSelectStory: (story: Story) => void;
  onAddStory: () => void;
  currentUser: User;
}

const StoryItem: React.FC<{ story: Story; onClick: () => void }> = ({ story, onClick }) => (
  <div className="flex flex-col items-center space-y-1 flex-shrink-0 cursor-pointer group" onClick={onClick}>
    <div className="relative">
      <div className="absolute -inset-0.5 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500"></div>
       <img
        className="relative h-16 w-16 rounded-full object-cover border-2 border-dark"
        src={story.user.avatar}
        alt={story.user.username}
      />
    </div>
    <span className="text-xs text-gray-300 w-20 text-center truncate">{story.user.username}</span>
  </div>
);

const AddStory: React.FC<{ onClick: () => void; currentUser: User; }> = ({ onClick, currentUser }) => (
    <div className="flex flex-col items-center space-y-1 flex-shrink-0 cursor-pointer group" onClick={onClick}>
        <div className="relative h-16 w-16">
            <img 
                className="h-16 w-16 rounded-full object-cover"
                src={currentUser.avatar}
                alt={currentUser.username}
            />
            <div className="absolute bottom-0 right-0 bg-primary rounded-full p-1 border-2 border-dark">
                <PlusIcon />
            </div>
        </div>
        <span className="text-xs text-gray-300">أضف قصة</span>
    </div>
);


const StoryReel: React.FC<StoryReelProps> = ({ stories, onSelectStory, onAddStory, currentUser }) => {
  return (
    <div className="p-4 border-b border-border">
      <div className="flex space-x-4 space-x-reverse overflow-x-auto scrollbar-hide">
        <AddStory onClick={onAddStory} currentUser={currentUser} />
        {stories.map(story => (
          <StoryItem key={story.id} story={story} onClick={() => onSelectStory(story)} />
        ))}
      </div>
    </div>
  );
};

export default StoryReel;
