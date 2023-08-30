import { ReservoirContext } from '@/contexts/ReservoirContext';
import { useContext } from 'react';

export function useReservoir() {
  const context = useContext(ReservoirContext);
  return context;
}
