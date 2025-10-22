
import React, { useEffect, useState } from 'react';
import { Notification as NotificationType } from '../types';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { XIcon } from './icons/XIcon';
import { InfoIcon } from './icons/InfoIcon';
import { ExclamationTriangleIcon } from './icons/ExclamationTriangleIcon';

interface NotificationProps {
  notification: NotificationType;
  onRemove: (id: number) => void;
}

const notificationTypes = {
  success: {
    Icon: CheckCircleIcon,
    iconClass: 'text-green-500',
    bgClass: 'bg-green-50 border-green-200',
  },
  error: {
    Icon: ExclamationTriangleIcon,
    iconClass: 'text-red-500',
    bgClass: 'bg-red-50 border-red-200',
  },
  info: {
    Icon: InfoIcon,
    iconClass: 'text-blue-500',
    bgClass: 'bg-blue-50 border-blue-200',
  },
};

const Notification: React.FC<NotificationProps> = ({ notification, onRemove }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 5000); // Auto-remove after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onRemove(notification.id);
    }, 300); // Duration of the exit animation
  };

  const { Icon, iconClass, bgClass } = notificationTypes[notification.type];

  return (
    <div
      className={`relative w-full p-4 pr-10 rounded-lg shadow-lg border flex items-start space-x-3 transition-all duration-300 ease-in-out transform ${bgClass} ${isExiting ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'}`}
      style={{ animation: 'notification-enter 0.3s ease-out forwards' }}
      role="alert"
    >
      <div className={`flex-shrink-0 ${iconClass}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-800">{notification.message}</p>
      </div>
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 p-1 rounded-full text-gray-400 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
        aria-label="Fermer la notification"
      >
        <XIcon className="w-4 h-4" />
      </button>
      <style>{`
        @keyframes notification-enter {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Notification;
