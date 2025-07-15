import { Button, Card, Form, Input, Typography } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

const { Title } = Typography

function Login() {
  return (
    <div className="centered-login">
      <Card className="login-card">
        <Title level={2} className="login-title">
          Iniciar Sesión
        </Title>
        <Form layout="vertical">
          <Form.Item label="Usuario" name="username">
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Ingresa tu usuario" 
              size="large"
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

export default Login 