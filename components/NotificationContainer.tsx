
import React from 'react';
import { Notification as NotificationType } from '../types';
import Notification from './Notification';

interface NotificationContainerProps {
  notifications: NotificationType[];
  onRemove: (id: number) => void;
}

const NotificationContainer: React.FC<NotificationContainerProps> = ({ notifications, onRemove }) => {
  return (
    <div className="fixed top-24 right-4 z-[1001] w-full max-w-xs sm:max-w-sm space-y-3">
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          notification={notification}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

export default NotificationContainer;
