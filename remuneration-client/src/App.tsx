import React from 'react';
import { BrowserRouter, useRoutes, useLocation } from "react-router-dom";
import { useActiveRoute } from './utilities/router';
import TopBar, { NavigationItem } from './components/TopBar';
import Amounts from './components/views/Amounts';
import Sales from './components/views/Sales';
import Reports from './components/views/Reports';

const AppLayout: React.FC = () => {
  const location = useLocation();
  const { isActiveRoute } = useActiveRoute(location);
  const navigationItems: NavigationItem[] = [
    { label: 'Amounts', route: '/amounts', active: isActiveRoute(['/', '/amounts']) },
    { label: 'Sales', route: '/sales', active: isActiveRoute('/sales') },
    { label: 'Reports', route: '/reports', active: isActiveRoute('/reports') },
  ];

  return (
    <div className="app">
      <header className="app-header">
        <div className="content">
          <TopBar navigation={navigationItems}/>
        </div>
      </header>
      <div className="app-body">
        <AppContent />
      </div>
    </div>
  );
};

const AppContent = () => useRoutes([
  { path: "/", element: <Amounts /> },
  { path: "/amounts", element: <Amounts /> },
  { path: "/sales", element: <Sales /> },
  { path: "/reports", element: <Reports /> }
]);

const App: React.FC = () => (
  <BrowserRouter>
    <AppLayout />
  </BrowserRouter>
);

export default App;
