import React from 'react';
import { NotificationIcon } from './icons/NotificationIcon';
import { MessagesIcon } from './icons/MessagesIcon';

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center p-4 border-b border-border sticky top-0 bg-darker/80 backdrop-blur-lg z-10">
      <h1 className="text-2xl font-black tracking-wider text-gradient-aurora">🌟 HintoriX</h1>
      <div className="flex items-center space-x-reverse space-x-4">
         <button className="relative p-2 rounded-full hover:bg-muted transition-colors">
          <MessagesIcon />
        </button>
        <button className="relative p-2 rounded-full hover:bg-muted transition-colors">
          <NotificationIcon />
          <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-darker"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;