import bgLogin from '@/assets/images/bg-login.png';
import { SignInForm } from '@/components/Forms/SignInForm';
import { Container, Image } from './styles';

export function SignIn() {
  return (
    <Container>
      <Image src={bgLogin} />
      <SignInForm />
    </Container>
  );
}
