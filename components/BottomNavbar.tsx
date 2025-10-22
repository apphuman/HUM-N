import React from 'react';
import { NavLink } from 'react-router-dom';
import { MENU_ITEMS } from '../constants';

const BottomNavbar: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full bg-[var(--card-background-color)] border-t border-[var(--border-color)] shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-50">
      <div className="max-w-[var(--app-max-width)] mx-auto flex justify-around"> {/* Use app-max-width */}
        {MENU_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive: navLinkIsActive }) =>
              `flex flex-col items-center justify-center flex-1 py-3 px-1 text-center group transition-colors duration-200 ease-in-out
               ${navLinkIsActive ? 'text-[var(--primary-color-dark)]' : 'text-[var(--text-color-lighter)] hover:text-[var(--primary-color)]'}`
            }
            aria-label={item.label}
          >
            {({ isActive: childIsActive }) => (
              <>
                <item.Icon 
                  className={`w-6 h-6 mb-1 transition-transform duration-200 ease-in-out ${childIsActive ? 'text-[var(--primary-color-dark)] scale-110' : 'text-[var(--text-color-lighter)] group-hover:text-[var(--primary-color)]'}`}
                  isActive={childIsActive} 
                />
                <span className={`text-xs tracking-tight font-medium ${childIsActive ? 'font-semibold text-[var(--primary-color-dark)]' : 'text-[var(--text-color-light)]'}`}>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavbar;