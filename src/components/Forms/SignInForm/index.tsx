import Logo from '@/assets/images/PRIOLogo.png';
import { Button } from '@/components/Button';
import { useAuth } from '@/hooks/useAuth';
import { Alert, Form, Input } from 'antd';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, FormStyled, Image, Title } from './styles';

export function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(false);

  const [form] = Form.useForm();
  const { signIn } = useAuth();

  const { pathname } = useLocation();
  const instanceName = pathname.split('/')[2];

  const onKeyDown = (keyEvent: any) => {
    if (keyEvent.getModifierState('CapsLock')) {
      setAlert(true);
    } else {
      setAlert(false);
    }
  };

  const handleSignIn = async ({ username, password }: any) => {
    try {
      setIsLoading(true);
      await signIn({ username, password });
    } catch (error) {
      return error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <FormStyled
        name="login"
        form={form}
        onFinish={handleSignIn}
        scrollToFirstError
      >
        <Image src={Logo} />

        <Title>SGDP - {instanceName}</Title>

        <Form.Item
          name="username"
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

        <Form.Item style={{ width: '100%', marginTop: 2 }}>
          <Button
            title={isLoading ? '' : 'Entrar'}
            htmlType="submit"
            icon={isLoading ? '' : 'SignIn'}
            fullWidth
            loading={isLoading}
          />
        </Form.Item>
      </FormStyled>
    </Container>
  );
}
