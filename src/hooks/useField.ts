import { FieldContext } from '@/contexts/FieldContext';
import { useContext } from 'react';

export function useField() {
  const context = useContext(FieldContext);
  return context;
}
