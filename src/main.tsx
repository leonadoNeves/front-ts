import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import App from './App.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { AuxiliaryProvider } from './contexts/AuxiliaryContext.tsx';
import { ClusterProvider } from './contexts/ClusterContext.tsx';
import { FieldProvider } from './contexts/FieldContext.tsx';
import { InstallationProvider } from './contexts/InstallationContext.tsx';
import { InstanceProvider } from './contexts/InstanceContext.tsx';
import { PermissionsProvider } from './contexts/PermissionsContext.tsx';
import { TableTypeProvider } from './contexts/TableContext.tsx';
import { ZoneProvider } from './contexts/ZoneContext.tsx';
import { defaultTheme } from './style/theme.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <AuthProvider>
          <PermissionsProvider>
            <InstanceProvider>
              <ClusterProvider>
                <InstallationProvider>
                  <FieldProvider>
                    <AuxiliaryProvider>
                      <ZoneProvider>
                        <TableTypeProvider>
                          <App />
                        </TableTypeProvider>
                      </ZoneProvider>
                    </AuxiliaryProvider>
                  </FieldProvider>
                </InstallationProvider>
              </ClusterProvider>
            </InstanceProvider>
          </PermissionsProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
