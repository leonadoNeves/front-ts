import moment from 'moment';
import 'moment/dist/locale/pt-br';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import App from './App.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { AuxiliaryProvider } from './contexts/AuxiliaryContext.tsx';
import { ClusterProvider } from './contexts/ClusterContext.tsx';
import { FieldProvider } from './contexts/FieldContext.tsx';
import HistoryProvider from './contexts/HistoryContext.tsx';
import { InstallationProvider } from './contexts/InstallationContext.tsx';
import { InstanceProvider } from './contexts/InstanceContext.tsx';
import { PermissionsProvider } from './contexts/PermissionsContext.tsx';
import { ReservoirProvider } from './contexts/ReservoirContext.tsx';
import { TableTypeProvider } from './contexts/TableContext.tsx';
import UsersProvider from './contexts/UserContext.tsx';
import { ZoneProvider } from './contexts/ZoneContext.tsx';
import { defaultTheme } from './style/theme.ts';

moment.locale('pt-br');

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
                        <ReservoirProvider>
                          <TableTypeProvider>
                            <UsersProvider>
                              <HistoryProvider>
                                <App />
                              </HistoryProvider>
                            </UsersProvider>
                          </TableTypeProvider>
                        </ReservoirProvider>
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
