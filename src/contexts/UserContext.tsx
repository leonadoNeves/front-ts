import { UserDTO } from '@/dtos/UserDTO';
import { api } from '@/service/api';
import { ReactNode, createContext } from 'react';

interface IUserContext {
  getUsers: () => Promise<UserDTO[]>;
}

type PropsUsersProvider = {
  children: ReactNode;
};

export const UsersContext = createContext({} as IUserContext);

const UsersProvider = ({ children }: PropsUsersProvider) => {
  const getUsers = async () => {
    try {
      const { data } = await api.get(`/users`);

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UsersContext.Provider
      value={{
        getUsers,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;
