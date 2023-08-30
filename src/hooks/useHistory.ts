import { historyContext } from '@/contexts/HistoryContext';
import { useContext } from 'react';

export function useHistory() {
  const context = useContext(historyContext);
  return context;
}
