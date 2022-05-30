import React, { useCallback } from 'react';
import './Button.css';
import { Link } from 'react-router-dom';

interface Props {
  disabled?: boolean;
  active?: boolean;
  link?: string;
  onClick?: () => void;
}

const Button: React.FC<
  React.PropsWithChildren<React.HTMLAttributes<HTMLButtonElement> & Props>
> = (props) => {
  const { disabled, active, link, onClick, className, children, ...attributes } = props;
  const hasLink = !!link;

  const handleClick = useCallback(() => {
    onClick && onClick();
  }, [onClick]);

  const ButtonComponent = () => {
    const classes =
      'button' +
      (active ? ' active' : '') +
      (!hasLink && className ? ` ${className}` : '');

    return (
      <button {...attributes} disabled={disabled} className={classes} onClick={handleClick}>
        {children}
      </button>
    );
  };

  const LinkComponent = () => {
    const classes =
      'button-link' +
      (disabled ? ' disabled' : '') +
      (className ? ` ${className}` : '');

    return (
      <Link to={link as string} className={classes}>
        <ButtonComponent />
      </Link>
    );
  };

  return hasLink ? <LinkComponent /> : <ButtonComponent />
};

export default Button;
