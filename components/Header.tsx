

import React, { useState, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { SLOGAN } from '../constants';
import { HumanLogo } from './icons/HumanLogo';
import { BellIcon } from './icons/BellIcon';
import { Notification } from '../types';
import NotificationDropdown from './NotificationDropdown';

interface HeaderProps {
  notifications: Notification[];
  removeNotification: (id: number) => void;
  markAllNotificationsAsRead: () => void;
}

const Header: React.FC<HeaderProps> = ({ notifications, removeNotification, markAllNotificationsAsRead }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const unreadCount = useMemo(() => notifications.filter(n => !n.isRead).length, [notifications]);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
    if (!isDropdownOpen && unreadCount > 0) {
      markAllNotificationsAsRead();
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-40 border-b border-[var(--border-color)] h-20">
      {/* This inner div ensures content is constrained to app's max-width and centered */}
      <div className="max-w-[var(--app-max-width)] mx-auto h-full">
        <div className="flex items-center justify-between h-full px-4 sm:px-6">
          <NavLink to="/" className="flex items-center group" aria-label="Accueil HUMĀN">
            <HumanLogo className="text-3xl group-hover:opacity-80 transition-opacity" />
          </NavLink>
          <p className="text-xs text-[var(--text-color-lighter)] italic hidden sm:block pl-3">
            {SLOGAN}
          </p>
          <div className="relative">
            <button
              onClick={handleToggleDropdown}
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-400"
              aria-label={`Notifications, ${unreadCount} non lues`}
            >
              <BellIcon className="w-6 h-6 text-gray-500" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
              )}
            </button>
            {isDropdownOpen && (
              <NotificationDropdown
                notifications={notifications}
                onClose={() => setIsDropdownOpen(false)}
                onRemove={removeNotification}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;