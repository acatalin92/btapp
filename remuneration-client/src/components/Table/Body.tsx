import React from 'react';
import './Body.css';

const Body: React.FC<
  React.PropsWithChildren<React.HTMLAttributes<HTMLTableSectionElement>>
> = ({ children, className, ...attributes }) => {
  return (
    <tbody className={`body${className ? ` ${className}` : ''}`} {...attributes}>
      {children}
    </tbody>
  );
};

export default Body;
