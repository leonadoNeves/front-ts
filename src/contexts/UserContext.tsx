import { ReactNode, createContext } from 'react';
import { UserDTO } from '@/dtos/UserDTO';
import { api } from '@/service/api';

interface IUserContext {
  getUsers: () => Promise<UserDTO[]>
}

type PropsUsersProvider = {
  children: ReactNode;
};

export const usersContext = createContext({} as IUserContext)

const UsersProvider = ({ children }: PropsUsersProvider) => {
  const getUsers = async () => {
    try {
      const { data } = await api.get(`/users`)

      return data


    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <usersContext.Provider value={{
      getUsers
    }}>
      {children}
    </usersContext.Provider>
  )
}

export default UsersProvider