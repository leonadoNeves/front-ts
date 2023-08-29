import { ChildrenDTO } from '@/dtos/PermissionsDTO';
import { useAuth } from '@/hooks/useAuth';
import { storageGetInstance } from '@/storage/storageInstance';
import { ReactNode, createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface IPermissionsContext {
  getPermission: boolean;
  postPermission: boolean;
  patchPermission: boolean;
  checkPermissions: (url: any) => void;
}

interface IPermissionsProvider {
  children: ReactNode;
}

const PermissionsContext = createContext<IPermissionsContext>(
  {} as IPermissionsContext,
);

const PermissionsProvider = ({ children }: IPermissionsProvider) => {
  const [getPermission, setGetPermission] = useState(false);
  const [postPermission, setPostPermission] = useState(false);
  const [patchPermission, setPatchPermission] = useState(false);

  const { user } = useAuth();

  const instance = storageGetInstance();
  const navigate = useNavigate();

  const checkPermissions = (url: any) => {
    const moduleName = `/${url.pathname.split('/')[3]}`;

    let menuItem = {} as ChildrenDTO;

    user.userPermissions?.forEach(menuParent => {
      if (menuParent.hasChildren) {
        menuItem =
          menuParent.children.find(
            menuChildren => menuChildren.menuRoute === moduleName,
          ) || menuItem;
      }

      if (!menuParent.hasChildren) {
        menuItem =
          user.userPermissions?.find(
            menuParent => menuParent.menuRoute === moduleName,
          ) || menuItem;
      }
    });

    if (menuItem) {
      const getOperation = menuItem?.userOperation?.find(
        operation => operation.operationName === 'GET',
      );

      const postOperation = menuItem?.userOperation?.find(
        operation => operation.operationName === 'POST',
      );

      const patchOperation = menuItem?.userOperation?.find(
        operation => operation.operationName === 'PATCH',
      );

      if (getOperation) {
        setGetPermission(true);
      } else {
        navigate(`/dashboard/${instance}`);
      }

      if (postOperation) {
        setPostPermission(true);
      }

      if (patchOperation) {
        setPatchPermission(true);
      }
    } else {
      navigate(`/dashboard/${instance}`);
    }
  };

  return (
    <PermissionsContext.Provider
      value={{
        getPermission,
        postPermission,
        patchPermission,
        checkPermissions,
      }}
    >
      {children}
    </PermissionsContext.Provider>
  );
};

export { PermissionsContext, PermissionsProvider };
