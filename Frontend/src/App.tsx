import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PortfolioProvider } from './context/PortfolioContext';
import { router } from './routes/AppRoutes';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <RouterProvider router={router} />
      </PortfolioProvider>
    </AuthProvider>
  );
};

export default App;
