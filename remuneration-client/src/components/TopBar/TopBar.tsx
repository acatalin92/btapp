import React from 'react';
import './TopBar.css';
import Logo from './Logo';
import Button from '../Button';

export interface NavigationItem {
  label: string;
  route: string;
  active?: boolean;
}

interface Props {
  navigation: Array<NavigationItem>;
}

const TopBar: React.FC<Props> = ({ navigation }) => {
  return (
    <div className="top-bar">
      <div className="logo-container">
        <Logo />
      </div>
      <div className="navigation-container">
        {!!navigation && navigation.map((item, i) => (
          <Button key={i} link={item.route} active={item.active} className="navigation-item">
            <span>{item.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TopBar;
