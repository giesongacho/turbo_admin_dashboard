import { Card, Form, Input, Button, Switch, Select, Divider } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, BellOutlined } from '@ant-design/icons';

const SettingsContent = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Settings updated:', values);
  };

  return (
    <>
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Settings</h3>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Profile Settings" className="shadow-sm">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              username: 'admin',
              email: 'admin@example.com',
              language: 'en',
            }}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input prefix={<UserOutlined />} size="large" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' },
              ]}
            >
              <Input prefix={<MailOutlined />} size="large" />
            </Form.Item>

            <Form.Item
              label="Language"
              name="language"
            >
              <Select size="large">
                <Select.Option value="en">English</Select.Option>
                <Select.Option value="es">Spanish</Select.Option>
                <Select.Option value="fr">French</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" className="bg-blue-600">
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <div className="space-y-6">
          <Card title="Security Settings" className="shadow-sm">
            <Form layout="vertical">
              <Form.Item label="Current Password">
                <Input.Password prefix={<LockOutlined />} size="large" />
              </Form.Item>
              <Form.Item label="New Password">
                <Input.Password prefix={<LockOutlined />} size="large" />
              </Form.Item>
              <Form.Item label="Confirm Password">
                <Input.Password prefix={<LockOutlined />} size="large" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" size="large" className="bg-blue-600">
                  Update Password
                </Button>
              </Form.Item>
            </Form>
          </Card>

          <Card title="Notifications" className="shadow-sm">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <BellOutlined className="text-lg" />
                  <div>
                    <p className="font-semibold">Email Notifications</p>
                    <p className="text-sm text-gray-500">Receive email updates</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <Divider className="my-3" />
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <BellOutlined className="text-lg" />
                  <div>
                    <p className="font-semibold">Push Notifications</p>
                    <p className="text-sm text-gray-500">Receive push updates</p>
                  </div>
                </div>
                <Switch />
              </div>
              <Divider className="my-3" />
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <BellOutlined className="text-lg" />
                  <div>
                    <p className="font-semibold">SMS Notifications</p>
                    <p className="text-sm text-gray-500">Receive SMS updates</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SettingsContent;