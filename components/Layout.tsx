

import React from 'react';
import BottomNavbar from './BottomNavbar';
import Header from './Header'; 
import { UserProfile, Notification } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  userProfile: UserProfile | null; 
  notifications: Notification[];
  removeNotification: (id: number) => void;
  markAllNotificationsAsRead: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, userProfile, notifications, removeNotification, markAllNotificationsAsRead }) => {
  const showHeaderAndNav = userProfile?.isOnboarded;

  return (
    <div className="flex flex-col min-h-screen text-[var(--text-color)]"> {/* Use min-h-screen on the outer div */}
      {showHeaderAndNav && <Header notifications={notifications} removeNotification={removeNotification} markAllNotificationsAsRead={markAllNotificationsAsRead} />}
      <main 
        className={`flex-grow flex flex-col bg-[var(--background-color)] 
          ${showHeaderAndNav ? 'pt-20 pb-20' : 'pt-0 pb-0'}` 
        } 
      >
        {children}
      </main>
      {showHeaderAndNav && <BottomNavbar />}
    </div>
  );
};

export default Layout;