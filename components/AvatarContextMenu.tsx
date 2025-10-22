import React, { useEffect, useRef } from 'react';
import { ContextMenuState } from '../types';

interface AvatarContextMenuProps {
  menuState: ContextMenuState;
  onClose: () => void;
  onViewProfile: () => void;
}

const AvatarContextMenu: React.FC<AvatarContextMenuProps> = ({
  menuState,
  onClose,
  onViewProfile,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && menuState.targetElement && !menuState.targetElement.contains(event.target as Node) ) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose, menuState.targetElement]);

  if (!menuState.isOpen) return null;

  let top = menuState.y;
  let left = menuState.x;

  if (menuRef.current) {
    const menuWidth = menuRef.current.offsetWidth;
    const menuHeight = menuRef.current.offsetHeight;
    if (left + menuWidth > window.innerWidth) {
      left = window.innerWidth - menuWidth - 10; 
    }
    if (top + menuHeight > window.innerHeight) {
       if (menuState.targetElement) {
        top = menuState.targetElement.getBoundingClientRect().top + window.scrollY - menuHeight;
      } else {
        top = window.innerHeight - menuHeight - 10;
      }
    }
    top = Math.max(10, top); // Ensure menu is not off-screen at the top
  }

  const handleProfileClick = () => {
    onViewProfile();
    onClose();
  }

  return (
    <div
      ref={menuRef}
      className="absolute z-[600] bg-[var(--card-background-color)] rounded-[var(--border-radius-md)] shadow-[var(--shadow-lg)] border border-[var(--border-color)] py-1.5 min-w-[180px]" // Increased min-width
      style={{ top: `${top}px`, left: `${left}px` }}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby={`avatar-button-${menuState.participantName}`} 
    >
      <button
        onClick={handleProfileClick}
        className="block w-full text-left px-3.5 py-2 text-sm text-[var(--text-color)] hover:bg-[var(--secondary-color)]/50 hover:text-[var(--text-color-dark)] transition-colors duration-150"
        role="menuitem"
      >
        Voir le profil
      </button>
    </div>
  );
};

export default AvatarContextMenu;