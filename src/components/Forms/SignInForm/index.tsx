import Logo from '@/assets/images/PRIOLogo.png';
import { Button } from '@/components/Button';
import { Alert, Form, Input } from 'antd';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, FormStyled, Image, Title } from './styles';

export function SignInForm() {
  const [alert, setAlert] = useState(false);

  const { pathname } = useLocation();
  const instanceName = pathname.split('/')[2];

  const onKeyDown = (keyEvent: any) => {
    if (keyEvent.getModifierState('CapsLock')) {
      setAlert(true);
    } else {
      setAlert(false);
    }
  };

  const handleSignIn = () => {};

  return (
    <Container>
      <FormStyled>
        <Image src={Logo} />

        <Title>SGDP - {instanceName}</Title>

        <Form.Item
          name="userName"
          rules={[
            {
              required: true,
              message: 'Campo obrigatório!',
            },
          ]}
          style={{ width: '100%' }}
        >
          <Input
            placeholder="Digite seu usuário"
            autoComplete="true"
            style={{ height: '40px' }}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Campo obrigatório!' }]}
          style={{ width: '100%' }}
        >
          <Input.Password
            placeholder="Digite sua senha"
            onKeyDown={onKeyDown}
            style={{ height: '40px' }}
          />
        </Form.Item>

        {alert && (
          <Alert
            message="Caps Lock ativado!"
            type="warning"
            showIcon
            style={{ width: '100%', marginBottom: '20px' }}
          />
        )}

        <Button title="Entrar" onClick={handleSignIn} icon="SignIn" fullWidth />
      </FormStyled>
    </Container>
  );
}
