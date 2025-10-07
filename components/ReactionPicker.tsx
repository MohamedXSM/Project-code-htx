import React from 'react';

const REACTIONS = ['❤️', '😂', '😯', '😢', '😡'];

interface ReactionPickerProps {
  onSelect: (reaction: string) => void;
  onClose?: () => void;
}

const ReactionPicker: React.FC<ReactionPickerProps> = ({ onSelect, onClose }) => {
  return (
    <div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 glass-card rounded-full p-2 flex space-x-2 shadow-lg z-20 animate-fade-in-up-fast"
        onMouseLeave={onClose}
    >
      {REACTIONS.map(reaction => (
        <button
          key={reaction}
          onClick={() => onSelect(reaction)}
          className="text-3xl transform transition-transform duration-150 hover:scale-125"
        >
          {reaction}
        </button>
      ))}
       <style>{`
        .animate-fade-in-up-fast {
            animation: fadeInUp 0.2s ease-out;
        }
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ReactionPicker;