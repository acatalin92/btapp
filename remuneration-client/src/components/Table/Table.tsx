import React from 'react';
import './Table.css';

const Table: React.FC<
  React.PropsWithChildren<React.HTMLAttributes<HTMLTableElement>>
> = ({ children, className, ...attributes }) => {
  return (
    <table
      cellSpacing={0}
      cellPadding={0}
      className={`table${className ? ` ${className}` : ''}`}
      {...attributes}
    >
      {children}
    </table>
  );
};

export default Table;
