import { ClusterContext } from '@/contexts/ClusterContext';
import { useContext } from 'react';

export function useCluster() {
  const context = useContext(ClusterContext);
  return context;
}
