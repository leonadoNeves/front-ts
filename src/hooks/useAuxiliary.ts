import { AuxiliaryContext } from '@/contexts/AuxiliaryContext';
import { useContext } from 'react';

export function useAuxiliary() {
  const context = useContext(AuxiliaryContext);
  return context;
}
