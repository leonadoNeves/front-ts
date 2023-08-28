import { useAuth } from '@/hooks/useAuth';
import { storageGetInstance } from '@/storage/storageInstance';
import { storageGetToken } from '@/storage/storageToken';
import { useNavigate } from 'react-router-dom';
import { Container } from './styles';

export function Error404() {
  const { user } = useAuth();
  const token = storageGetToken();
  const instance = storageGetInstance();

  const navigate = useNavigate();

  const handleInitialPage = () => {
    if (user && token) {
      navigate(`/dashboard/${instance}`);
    } else {
      navigate('/');
    }
  };

  return (
    <Container>
      <div className="animacao">
        <div className="extrator"></div>
        <div className="topo"></div>
        <div className="cabo3"></div>
        <div className="base">
          <div className="cabo1"></div>
          <div className="cabo2"></div>
          <div className="contrapeso"></div>
        </div>
      </div>

      <p className="texto">Alguma coisa deu errado!</p>
      <p className="subtitle">
        Parece que a página não existe ou você não tem permissão para acessá-la.
      </p>
      <button className="botao" onClick={handleInitialPage}>
        Voltar para a página inicial
      </button>
    </Container>
  );
}
