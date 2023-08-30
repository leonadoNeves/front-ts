import { ZoneContext } from '@/contexts/ZoneContext';
import { useContext } from 'react';

export function useZone() {
  const context = useContext(ZoneContext);
  return context;
}
