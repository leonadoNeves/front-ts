import { useAuth } from '@/hooks/useAuth';
import { storageGetToken } from '@/storage/storageToken';
import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

export function Router() {
  const { user } = useAuth();
  const token = storageGetToken();

  if (user && token) {
    return <AppRoutes />;
  }

  return <AuthRoutes />;
}
