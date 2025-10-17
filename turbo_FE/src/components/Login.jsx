import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, user } = useAuth();

  // If already authenticated, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const onFinish = async (values) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock authentication - replace with your actual API call
      if (values.username === 'admin' && values.password === 'admin123') {
        const userData = {
          username: values.username,
          email: 'admin@example.com',
          role: 'admin'
        };
        login(userData);
        message.success('Login successful!');
        navigate('/dashboard');
      } else {
        message.error('Invalid username or password!');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <Card className="w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Please login to your account</p>
        </div>

        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Username" 
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700"
              loading={loading}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center text-sm text-gray-600">
          <p>Username: <span className="font-semibold">admin</span></p>
          <p>Password: <span className="font-semibold">admin123</span></p>
        </div>
      </Card>
    </div>
  );
};

export default Login;