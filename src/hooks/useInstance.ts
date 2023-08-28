import { InstanceContext } from '@/contexts/InstanceContext';
import { useContext } from 'react';

export function useInstance() {
  const context = useContext(InstanceContext);
  return context;
}
