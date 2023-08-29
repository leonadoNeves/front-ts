import { clusterContext } from '@/contexts/ClusterContext';
import { useContext } from 'react';

export function useCluster() {
  const context = useContext(clusterContext);
  return context;
}
