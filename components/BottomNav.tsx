import React, { useState } from 'react';
import { HomeIcon } from './icons/HomeIcon';
import { SearchIcon } from './icons/SearchIcon';
import { ReelsIcon } from './icons/ReelsIcon';
import { ProfileIcon } from './icons/ProfileIcon';
import { MoreIcon } from './icons/MoreIcon';

const NavItem: React.FC<{ icon: React.ReactNode; label: string; onClick?: () => void }> = ({ icon, label, onClick }) => (
    <button onClick={onClick} className="flex flex-col items-center justify-center text-gray-400 hover:text-white transition-colors space-y-1 w-1/5">
        {icon}
        <span className="text-xs font-medium">{label}</span>
    </button>
);

const BottomNav: React.FC = () => {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-darker/80 backdrop-blur-lg border-t border-border z-30">
      <div className="container mx-auto max-w-md relative">
        {isMoreMenuOpen && (
          <div 
            className="absolute bottom-20 right-4 glass-card rounded-lg shadow-lg p-2 z-20 w-40 animate-fade-in-up-fast"
            onMouseLeave={() => setIsMoreMenuOpen(false)}
          >
            <ul className="text-sm">
              <li className="p-2 hover:bg-border rounded cursor-pointer text-white">الدعم</li>
              <li className="p-2 hover:bg-border rounded cursor-pointer text-red-400">تسجيل الخروج</li>
            </ul>
          </div>
        )}
        <div className="flex justify-around items-center h-16">
          <NavItem icon={<HomeIcon />} label="الرئيسية" />
          <NavItem icon={<SearchIcon />} label="البحث" />
          <NavItem icon={<ReelsIcon />} label="الريلز" />
          <NavItem icon={<ProfileIcon />} label="الملف الشخصي" />
          <NavItem icon={<MoreIcon />} label="المزيد" onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)} />
        </div>
      </div>
       <style>{`
        .animate-fade-in-up-fast {
            animation: fadeInUp 0.2s ease-out;
        }
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </nav>
  );
};

export default BottomNav;