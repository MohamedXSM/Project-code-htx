import React from 'react';

interface Action {
    label: string;
    action: () => void;
    destructive?: boolean;
}

interface ActionMenuProps {
  onClose: () => void;
  actions: Action[];
}

const ActionMenu: React.FC<ActionMenuProps> = ({ onClose, actions }) => {
  return (
    <div className="fixed inset-0 bg-black/60 z-40 flex items-end" onClick={onClose}>
      <div 
        className="bg-darker w-full rounded-t-2xl p-4 animate-slide-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1.5 bg-border rounded-full mx-auto mb-4"></div>
        <ul>
          {actions.map((action, index) => (
            <li key={index}>
              <button 
                onClick={() => { action.action(); onClose(); }}
                className={`w-full text-center p-3 text-lg rounded-lg transition-colors ${
                  action.destructive ? 'text-red-500 hover:bg-red-500/10' : 'text-white hover:bg-border'
                }`}
              >
                {action.label}
              </button>
            </li>
          ))}
          <li>
             <button 
                onClick={onClose}
                className="w-full text-center p-3 text-lg rounded-lg mt-2 text-primary bg-border hover:bg-border/70"
              >
                إلغاء
              </button>
          </li>
        </ul>
        <style>{`
          .animate-slide-in-up {
            animation: slideInUp 0.3s ease-out forwards;
          }
          @keyframes slideInUp {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default ActionMenu;
