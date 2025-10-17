import { Card, Table, Tag, Avatar, Button, Input, Space, Modal, Form, Select, message, Switch } from 'antd';
import { UserOutlined, SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import Services from '../../services/agentServices';

const UsersContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await Services.CreateAgent({ ...values, status: 1 });
      const res = await Services.AgentList();
      const formattedData = res.data.data.map((user, index) => ({
        ...user,
        key: user.id || index + 1,
      }));
      setUsers(formattedData);
      message.success('Agent created successfully!');
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      message.error('Failed to create agent');
      console.error('Error creating agent:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusToggle = async (id, currentStatus) => {
    if (!id) {
      message.error('Agent ID is missing');
      console.error('Missing ID for toggle:', id);
      return;
    }
    setLoading(true);
    try {
      const newStatus = currentStatus === 1 ? 0 : 1;
      const response = await Services.UpdateAgentStatus(id, newStatus); // Capture response
      console.log('Update response:', response.data);
      const res = await Services.AgentList();
      const formattedData = res.data.data.map((user, index) => ({
        ...user,
        key: user.id || index + 1,
      }));
      setUsers(formattedData);
      message.success(`Agent status updated to ${newStatus === 1 ? 'Active' : 'Inactive'}`);
    } catch (error) {
      message.error('Failed to update status');
      console.error('Error updating status:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'User',
      dataIndex: 'agent_name',
      key: 'agent_name',
      render: (text, record) => (
        <div className="flex items-center gap-3">
          <Avatar icon={<UserOutlined />} className="bg-blue-500" />
          <div>
            <p className="font-semibold">{text}</p>
            <p className="text-sm text-gray-500">{record.email}</p>
          </div>
        </div>
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'dp_phone',
      key: 'dp_phone',
    },
    {
      title: 'Target ID',
      dataIndex: 'target_id',
      key: 'target_id',
    },
    {
      title: 'Agent Type',
      dataIndex: 'agent_type',
      key: 'agent_type',
      render: (type) => (
        <Tag color={type === 'hq' ? 'blue' : 'green'}>
          {type.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => {
        return (
          <div className="flex items-center gap-2">
            <span>{status === 1 ? 'Active' : 'Inactive'}</span>
            <Switch
              checked={status === 1}
              onChange={() => handleStatusToggle(record.id, status)}
              loading={loading}
              disabled={!record.id}
            />
          </div>
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space>
          <Button type="text" icon={<EditOutlined />} className="text-blue-600" />
          <Button type="text" icon={<DeleteOutlined />} className="text-red-600" />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setLoading(true);
        const res = await Services.AgentList();
        const formattedData = res.data.data.map((user, index) => ({
          ...user,
          key: user.id || index + 1,
        }));
        setUsers(formattedData);
      } catch (error) {
        console.error('Error fetching agents:', error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  return (
    <>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">Users Management</h3>
          <p className="text-gray-600">Manage and monitor all users in your system</p>
        </div>
        <Button type="primary" icon={<PlusOutlined />} size="large" className="bg-blue-600" onClick={showModal}>
          Add New User
        </Button>
      </div>

      <Modal
        title="Create Agent"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="mt-4"
        >
          <Form.Item
            label="Agent Name"
            name="agent_name"
            rules={[{ required: true, message: 'Please enter agent name' }, { min: 2, message: 'Agent name must be at least 2 characters' }]}
          >
            <Input placeholder="Enter agent name" size="large" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please enter email' }, { type: 'email', message: 'Please enter a valid email' }]}
          >
            <Input placeholder="Enter email address" size="large" type="email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter password' }, { min: 6, message: 'Password must be at least 6 characters' }]}
          >
            <Input.Password placeholder="Enter password" size="large" />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="dp_phone"
            rules={[{ required: true, message: 'Please enter phone number' }]}
          >
            <Input placeholder="Enter phone number" size="large" />
          </Form.Item>

          <Form.Item
            label="Target ID"
            name="target_id"
            rules={[{ required: true, message: 'Please enter target ID' }]}
          >
            <Input placeholder="Enter target ID" size="large" />
          </Form.Item>

          <Form.Item
            label="Agent Type"
            name="agent_type"
            rules={[{ required: true, message: 'Please select agent type' }]}
          >
            <Select
              placeholder="Select agent type"
              size="large"
              options={[
                { value: 'hq', label: 'HQ' },
                { value: 'wfh', label: 'WFH' },
              ]}
            />
          </Form.Item>

          <Form.Item className="mb-0 mt-6">
            <Space className="w-full justify-end">
              <Button onClick={handleCancel} size="large">
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="large"
                className="bg-blue-600"
              >
                Create Agent
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      <Card className="shadow-sm">
        <div className="mb-4">
          <Input
            placeholder="Search users..."
            prefix={<SearchOutlined />}
            size="large"
            className="max-w-md"
          />
        </div>
        <Table
          columns={columns}
          dataSource={users}
          pagination={{ pageSize: 5 }}
          scroll={{ x: 800 }}
          loading={loading}
          rowKey="key"
        />
      </Card>
    </>
  );
};

export default UsersContent;