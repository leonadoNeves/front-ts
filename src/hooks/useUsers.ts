import { UsersContext } from '@/contexts/UserContext';
import { useContext } from 'react';

export function useUsers() {
  const context = useContext(UsersContext);
  return context;
}
