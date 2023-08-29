import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import App from './App.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { InstanceProvider } from './contexts/InstanceContext.tsx';
import { PermissionsProvider } from './contexts/PermissionsContext.tsx';
import { TableTypeProvider } from './contexts/TableContext.tsx';
import { defaultTheme } from './style/theme.ts';
import { ClusterProvider } from './contexts/ClusterContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <AuthProvider>
          <PermissionsProvider>
            <InstanceProvider>
              <ClusterProvider>
                <TableTypeProvider>
                  <App />
                </TableTypeProvider>
              </ClusterProvider>
            </InstanceProvider>
          </PermissionsProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
