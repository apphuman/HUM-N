
import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  title?: string; // Title is now optional
  titleClassName?: string;
  headerContent?: React.ReactNode; // Optional content for the right side of the title
  // Add a prop for custom padding if needed, or remove default padding for full control
  disableDefaultPadding?: boolean; 
}

const PageContainer: React.FC<PageContainerProps> = ({ children, title, titleClassName, headerContent, disableDefaultPadding }) => {
  const paddingClass = disableDefaultPadding ? '' : 'p-5 sm:p-6';

  return (
    <div className={`${paddingClass} h-full overflow-y-auto`} data-main-scroll-container="true"> 
      {(title || headerContent) && (
        <div className="flex justify-between items-center mb-5 sm:mb-6">
          {title && <h1 className={`text-2xl font-bold text-[var(--text-color)] ${titleClassName}`}>{title}</h1>}
          {headerContent && <div>{headerContent}</div>}
        </div>
      )}
      <div className="space-y-6 sm:space-y-8"> 
        {children}
      </div>
    </div>
  );
};

export default PageContainer;