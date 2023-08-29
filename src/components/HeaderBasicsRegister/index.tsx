import { useInstance } from '@/hooks/useInstance';
import { Link } from 'react-router-dom';
import { Button } from '../Button';
import { ContainerButton } from './styles';

interface IHeader {
  href: string;
}

export const HeaderBasicsRegister = ({ href }: IHeader) => {
  const { isBotafogoInstance } = useInstance();

  return (
    <ContainerButton>
      <Link to={href}>
        {!isBotafogoInstance && (
          <Button
            type="primary"
            icon="Plus"
            toolTipMessage="Cadastrar Instalação"
            toolTipPosition="topLeft"
          />
        )}
      </Link>
    </ContainerButton>
  );
};
