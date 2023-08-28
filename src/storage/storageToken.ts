import { TOKEN_KEY } from './storageConfig';

const storageGetToken = () => localStorage.getItem(TOKEN_KEY);
const storageRemoveToken = async () => localStorage.removeItem(TOKEN_KEY);

export { storageGetToken, storageRemoveToken };
