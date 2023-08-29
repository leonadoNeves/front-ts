import { InstallationContext } from '@/contexts/InstallationContext';
import { useContext } from 'react';

export function useInstallation() {
  const context = useContext(InstallationContext);
  return context;
}
