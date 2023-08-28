import { TOKEN_KEY } from './storageConfig';

const storageGetToken = () => localStorage.getItem(TOKEN_KEY);

export { storageGetToken };
