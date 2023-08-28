import { UserDTO } from '@/dtos/UserDTO';
import { api } from '@/service/api';
import {
  storageGetInstance,
  storageRemoveInstance,
  storageRemoveInstanceSelected,
} from '@/storage/storageInstance';
import {
  storageGetToken,
  storageRemoveToken,
  storageSetToken,
} from '@/storage/storageToken';
import encrypt from '@/utils/crypto/encrypt';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

type PropsAuthContext = {
  user: UserDTO;
  signIn: (dataLogin: PropsDataLogin) => Promise<void>;
  signOut: () => void;
};

type PropsAuthProvider = {
  children: ReactNode;
};

export type PropsDataLogin = {
  username: string;
  password: string;
};

const AuthContext = createContext<PropsAuthContext>({} as PropsAuthContext);

function AuthProvider({ children }: PropsAuthProvider) {
  const [user, setUser] = useState({} as UserDTO);

  const token = storageGetToken();
  const instance = storageGetInstance();
  const navigate = useNavigate();

  const getProfile = async () => {
    try {
      const { data } = await api.get('/users/profile');
      setUser(data);
    } catch (error: any) {
      toast.error('Não foi possível carregar os dados do perfil.');
      return error;
    }
  };

  const signIn = async ({ username, password }: PropsDataLogin) => {
    try {
      const encryptedUsername = encrypt({ text: username });
      const encryptedPassword = encrypt({ text: password });

      const { data } = await api.post('/loginDev', {
        username: encryptedUsername,
        password: encryptedPassword,
      });

      await storageSetToken(data.token);
      api.defaults.headers.Authorization = `Bearer ${data.token}`;

      await getProfile();
      navigate(`/dashboard/${instance}`);

      toast.success('Login realizado com sucesso!');
    } catch (error: any) {
      toast.error(
        'Não foi possível realizar o login. Verifique suas credenciais!',
      );

      return error;
    }
  };

  const signOut = async () => {
    await storageRemoveToken();
    await storageRemoveInstance();
    await storageRemoveInstanceSelected();

    setUser({} as UserDTO);
    navigate('/');
  };

  useEffect(() => {
    if (token) {
      getProfile();
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
