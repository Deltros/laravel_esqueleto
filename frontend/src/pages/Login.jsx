import { Button, Card, Form, Input, Typography, Alert } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const { Title } = Typography

function LoginForm() {
  const { login } = useAuth()
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const onFinish = async (values, event) => {
    if (event) event.preventDefault();
    const data = await login(values);
    if (data.token) {
      setError(null);
      navigate('/');
    } else {
      setError('Credenciales incorrectas');
    }
  }

  return (
    <div className="centered-login">
      <Card className="login-card">
        <Title level={2} className="login-title">
          Iniciar Sesión
        </Title>
        {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} />}
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email">
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Ingresa tu email" 
              size="large"
              type="email"
            />
          </Form.Item>
          <Form.Item label="Contraseña" name="password">
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder="Ingresa tu contraseña" 
              size="large"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              Ingresar
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default function Login() {
  return <LoginForm />;
} 