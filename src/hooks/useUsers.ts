import { usersContext } from '@/contexts/UserContext';
import { useContext } from 'react';

export function useUsers() {
  const context = useContext(usersContext);
  return context;
}
