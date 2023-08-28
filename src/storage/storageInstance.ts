import { INSTANCE_KEY } from './storageConfig';

const storageGetInstance = () => localStorage.getItem(INSTANCE_KEY);

const storageSetInstance = (instance: string) =>
  localStorage.setItem(INSTANCE_KEY, instance);

const storageRemoveInstance = async () => {
  localStorage.removeItem(INSTANCE_KEY);
};

export { storageGetInstance, storageRemoveInstance, storageSetInstance };
