import React, { useState } from 'react';
import Header from './components/Header';
import StoryReel from './components/StoryReel';
import Feed from './components/Feed';
import BottomNav from './components/BottomNav';
import StoryViewer from './components/StoryViewer';
import StoryCreator from './components/StoryCreator';
import { INITIAL_STORIES, USERS } from './constants';
import { Story } from './types';

const App: React.FC = () => {
  const [stories, setStories] = useState<Story[]>(INITIAL_STORIES);
  const [viewingStory, setViewingStory] = useState<Story | null>(null);
  const [isCreatingStory, setIsCreatingStory] = useState(false);

  const handleSelectStory = (story: Story) => {
    setViewingStory(story);
  };

  const handleCloseStory = () => {
    setViewingStory(null);
  };
  
  const handleAddStory = (mediaUrl: string) => {
    const newStory: Story = {
      id: stories.length + 2, // A simple way to generate a unique ID
      user: USERS[0], // Assuming current user is the first one
      mediaUrl,
    };
    // Add new story and filter out any existing story from the current user
    setStories([newStory, ...stories.filter(s => s.user.id !== USERS[0].id)]);
    setIsCreatingStory(false);
  };


  return (
    <div className="bg-dark text-white min-h-screen font-sans">
      <div className="container mx-auto max-w-md">
        <Header />
        <main className="pb-16">
          <StoryReel 
            stories={stories} 
            onSelectStory={handleSelectStory}
            onAddStory={() => setIsCreatingStory(true)}
            currentUser={USERS[0]}
          />
          <Feed />
        </main>
        <BottomNav />
      </div>
      {viewingStory && (
        <StoryViewer
          stories={stories.filter(s => s.user.id === viewingStory.user.id)}
          initialStoryId={viewingStory.id}
          onClose={handleCloseStory}
        />
      )}
      {isCreatingStory && (
          <StoryCreator onClose={() => setIsCreatingStory(false)} onAddStory={handleAddStory} />
      )}
    </div>
  );
};

export default App;
