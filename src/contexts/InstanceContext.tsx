import { storageSetInstanceSelected } from '@/storage/storageInstance';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';

type PropsInstanceContext = {
  selectedInstance: string;
  setSelectedInstance: Dispatch<SetStateAction<string>>;
  breadcrumbFieldId: string;
  setBreadcrumbFieldId: Dispatch<SetStateAction<string>>;
  isBotafogoInstance: boolean;
};

type PropsInstanceProvider = {
  children: ReactNode;
};

const InstanceContext = createContext<PropsInstanceContext>(
  {} as PropsInstanceContext,
);

const InstanceProvider = ({ children }: PropsInstanceProvider) => {
  const [selectedInstance, setSelectedInstance] = useState('');
  const [breadcrumbFieldId, setBreadcrumbFieldId] = useState('');

  const location = useLocation();
  const instanceName = location.pathname.split('/')[2];
  const isBotafogoInstance = instanceName === 'Botafogo';

  useEffect(() => {
    if (isBotafogoInstance) {
      setSelectedInstance('Consolidador');
      storageSetInstanceSelected('Consolidador');
    }
  }, [isBotafogoInstance]);

  return (
    <InstanceContext.Provider
      value={{
        selectedInstance,
        setSelectedInstance,
        breadcrumbFieldId,
        setBreadcrumbFieldId,
        isBotafogoInstance,
      }}
    >
      {children}
    </InstanceContext.Provider>
  );
};

export { InstanceContext, InstanceProvider };
