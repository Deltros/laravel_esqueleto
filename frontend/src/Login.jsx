import { Button, Card, Form, Input, Typography } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { AuthProvider } from './auth/AuthContext'
import { useAuth } from './auth/useAuth'

const { Title } = Typography

function LoginForm() {
  const { login } = useAuth()

  const onFinish = (values, event) => {
    if (event) event.preventDefault();
    login(values)
  }

  return (
    <div className="centered-login">
      <Card className="login-card">
        <Title level={2} className="login-title">
          Iniciar Sesión
        </Title>
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
  return (
    <AuthProvider>
      <LoginForm />
    </AuthProvider>
  )
} 