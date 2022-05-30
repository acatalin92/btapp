import React from 'react';
import './Head.css';

const Head: React.FC<
  React.PropsWithChildren<React.HTMLAttributes<HTMLTableSectionElement>>
> = ({ children, className, ...attributes }) => {
  return (
    <thead className={`head${className ? ` ${className}` : ''}`} {...attributes}>
      {children}
    </thead>
  );
};

export default Head;
