import Logo from '@/assets/images/PRIOLogo.png';
import { Alert, Form, Input } from 'antd';
import { useState } from 'react';
import { Container, FormStyled, Image } from './styles';

export function SignInForm() {
  const [alert, setAlert] = useState(false);

  const onKeyDown = (keyEvent: any) => {
    if (keyEvent.getModifierState('CapsLock')) {
      setAlert(true);
    } else {
      setAlert(false);
    }
  };

  return (
    <Container>
      <FormStyled>
        <Image src={Logo} />

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
            style={{ width: '100%' }}
          />
        )}
      </FormStyled>
    </Container>
  );
}
