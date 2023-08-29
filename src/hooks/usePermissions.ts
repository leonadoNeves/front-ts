import { PermissionsContext } from '@/contexts/PermissionsContext';
import { useContext } from 'react';

export function usePermissions() {
  const context = useContext(PermissionsContext);
  return context;
}
