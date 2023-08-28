import { UserDTO } from '@/dtos/UserDTO';
import { createContext, ReactNode, useState } from 'react';

type PropsAuthContext = {
  user: UserDTO;
};

type PropsAuthProvider = {
  children: ReactNode;
};

const AuthContext = createContext<PropsAuthContext>({} as PropsAuthContext);

function AuthProvider({ children }: PropsAuthProvider) {
  const [user, setUser] = useState({} as UserDTO);

  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
