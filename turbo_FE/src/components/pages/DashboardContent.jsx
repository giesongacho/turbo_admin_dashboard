import { Card, Row, Col, Statistic, Avatar } from 'antd';
import {
  UserOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';
import { useState, useEffect } from 'react';
import Services from '../../services/agentServices';

const DashboardContent = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAgents = async () => {
    try {
      setLoading(true);
      const res = await Services.AgentList();
      console.log('Dashboard fetch response:', res.data);
      const formattedData = res.data.data.map((user, index) => ({
        ...user,
        key: user.id || index + 1,
      }));
      setAgents(formattedData);
    } catch (error) {
      console.error('Error fetching agents for dashboard:', error);
      setAgents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const totalAgents = agents.length;
  const activeAgents = agents.filter(agent => agent.status === 1).length;
  const inactiveAgents = agents.filter(agent => agent.status === 0).length;
  const wfhAgents = agents.filter(agent => agent.agent_type === 'wfh').length;

  return (
    <div className='h-[70vh]'>
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800">
          Welcome back, admin! 👋
        </h3>
        <p className="text-gray-600">Here's what's happening with your agents today.</p>
      </div>

      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic
              title={<span className="text-gray-600">Total Agents</span>}
              value={totalAgents}
              prefix={<UserOutlined className="text-green-600" />}
              valueStyle={{ color: '#16a34a', fontSize: '28px', fontWeight: 'bold' }}
              suffix={totalAgents > 0 ? <ArrowUpOutlined /> : null}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic
              title={<span className="text-gray-600">Active Agents</span>}
              value={activeAgents}
              valueStyle={{ color: '#2563eb', fontSize: '28px', fontWeight: 'bold' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic
              title={<span className="text-gray-600">Inactive Agents</span>}
              value={inactiveAgents}
              valueStyle={{ color: '#dc2626', fontSize: '28px', fontWeight: 'bold' }}
              suffix={inactiveAgents > 0 ? <ArrowDownOutlined /> : null}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic
              title={<span className="text-gray-600">WFH Agents</span>}
              value={wfhAgents}
              valueStyle={{ color: '#16a34a', fontSize: '28px', fontWeight: 'bold' }}
              suffix={wfhAgents > 0 ? <ArrowUpOutlined /> : null}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={32}>
          <Card title="Recent Agent Activity" className="h-full shadow-sm">
            <div className="space-y-4">
              {agents.map((agent) => (
                <div key={agent.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <Avatar size={45} icon={<UserOutlined />} className="bg-blue-500" />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{agent.agent_name}</p>
                    <p className="text-sm text-gray-500">{agent.email} | {agent.dp_phone} | {agent.target_id} | {agent.agent_type.toUpperCase()} | {agent.status === 1 ? 'Active' : 'Inactive'}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardContent;