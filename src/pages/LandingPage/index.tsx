import albacoraForte from '@/assets/images/LandingPage/albacora-forte.png';
import arpoador from '@/assets/images/LandingPage/arpoador.png';
import botafogo from '@/assets/images/LandingPage/botafogo.jpg';
import fradeValente from '@/assets/images/LandingPage/frade-valente.png';
import polvoBravo from '@/assets/images/LandingPage/polvo-bravo.png';
import { Card } from './components/Card';
import { Container } from './styles';

//Quando for subir para produção, basta descomentar a href de prod e comentar a de dev
const instances = [
  {
    name: 'Bravo',
    imageUrl: polvoBravo,
    href: 'signIn/Bravo',
    // href: 'https://sgdpbravo.petrorio.local/signIn/Bravo',
  },
  {
    name: 'Polvo-A',
    imageUrl: arpoador,
    href: 'signIn/Bravo',
    // href: 'https://sgdpbravo.petrorio.local/signIn/Bravo',
  },
  {
    name: 'Botafogo',
    imageUrl: botafogo,
    href: 'signIn/Botafogo',
    // href: 'https://sgdpbotafogo.petrorio.local/signIn/Botafogo',
  },
  {
    name: 'Forte',
    imageUrl: albacoraForte,
    href: 'signIn/Forte',
    // href: 'https://sgdpforte.petrorio.local/signIn/Forte',
  },
  {
    name: 'Valente',
    imageUrl: fradeValente,
    href: 'signIn/Valente',
    // href: 'https://sgdpvalente.petrorio.local/signIn/Valente',
  },
];

export function LandingPage() {
  return (
    <Container>
      {instances.map(instance => (
        <Card
          imageUrl={instance.imageUrl}
          title={instance.name}
          href={instance.href}
        />
      ))}
    </Container>
  );
}
