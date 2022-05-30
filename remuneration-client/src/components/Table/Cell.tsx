import React from 'react';
import './Cell.css';

const Cell: React.FC<
  React.PropsWithChildren<React.HTMLAttributes<HTMLTableCellElement>>
> = ({ children, className, ...attributes }) => {
  return (
    <td className={`cell${className ? ` ${className}` : ''}`} {...attributes}>
      {children}
    </td>
  );
};

export default Cell;
