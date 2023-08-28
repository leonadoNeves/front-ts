import albacoraForte from '@/assets/images/LandingPage/albacora-forte.png';
import fradeValente from '@/assets/images/LandingPage/frade-valente.png';
import polvoBravo from '@/assets/images/LandingPage/polvo-bravo.png';
import botafogo from '@/assets/images/LandingPage/sede-botafogo.jpg';
import { useAuth } from '@/hooks/useAuth';
import { storageGetInstance } from '@/storage/storageInstance';
import { Image, Subtitle, Title } from './styles';

export const HomeScreen = () => {
  const { user } = useAuth();
  const instance = storageGetInstance();

  const verifyInstanceImgBackground = () => {
    if (instance === 'Botafogo') {
      return botafogo;
    } else if (instance === 'Bravo') {
      return polvoBravo;
    } else if (instance === 'Forte') {
      return albacoraForte;
    } else if (instance === 'Valente') {
      return fradeValente;
    }
  };

  return (
    <>
      <Title>Bem-vindo, {user?.name}!</Title>
      <Subtitle>Você está acessando o sistema de: {instance}</Subtitle>
      <Image src={verifyInstanceImgBackground()} alt="Imagem da Instância" />
    </>
  );
};
