import React, { useRef, useEffect } from 'react';
import { Notification as NotificationType } from '../types';
import { CheckCircleIcon, XIcon, InfoIcon, ExclamationTriangleIcon } from './icons';

interface NotificationDropdownProps {
  notifications: NotificationType[];
  onClose: () => void;
  onRemove: (id: number) => void;
}

const notificationTypes = {
  success: { Icon: CheckCircleIcon, iconClass: 'text-green-500', bgClass: 'bg-green-50' },
  error: { Icon: ExclamationTriangleIcon, iconClass: 'text-red-500', bgClass: 'bg-red-50' },
  info: { Icon: InfoIcon, iconClass: 'text-blue-500', bgClass: 'bg-blue-50' },
};

const NotificationItem: React.FC<{ notification: NotificationType; onRemove: (id: number) => void }> = ({ notification, onRemove }) => {
  const { Icon, iconClass, bgClass } = notificationTypes[notification.type];

  return (
    <div className={`p-3 flex items-start space-x-3 transition-colors duration-150 hover:bg-gray-50 ${notification.isRead ? '' : bgClass}`}>
      <div className={`flex-shrink-0 mt-0.5 ${iconClass}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-700">{notification.message}</p>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onRemove(notification.id); }}
        className="flex-shrink-0 p-1 rounded-full text-gray-400 hover:bg-gray-200"
        aria-label="Supprimer la notification"
      >
        <XIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ notifications, onClose, onRemove }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full right-0 mt-3 w-80 max-w-sm bg-white rounded-lg shadow-2xl border border-gray-200 z-50 flex flex-col"
      style={{ maxHeight: 'calc(100vh - 8rem)' }}
    >
      <div className="p-3 border-b border-gray-200">
        <h3 className="font-semibold text-gray-800">Notifications</h3>
      </div>
      <div className="flex-grow overflow-y-auto">
        {notifications.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {notifications.map(notification => (
              <NotificationItem key={notification.id} notification={notification} onRemove={onRemove} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 text-center p-6">Vous n'avez aucune notification.</p>
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;
