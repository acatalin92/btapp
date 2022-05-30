import React from 'react';

const Row: React.FC<
  React.PropsWithChildren<React.HTMLAttributes<HTMLTableRowElement>>
> = ({ children, className, ...attributes }) => {
  return (
    <tr className={`row${className ? ` ${className}` : ''}`} {...attributes}>
      {children}
    </tr>
  );
};

export default Row;
