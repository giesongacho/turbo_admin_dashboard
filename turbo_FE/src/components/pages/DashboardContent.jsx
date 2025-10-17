import { Card, Row, Col, Statistic, Avatar } from 'antd';
import {
  UserOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';

const DashboardContent = () => {
  return (
    <>
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800">
          Welcome back, admin! 👋
        </h3>
        <p className="text-gray-600">Here's what's happening with your account today.</p>
      </div>

      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic
              title={<span className="text-gray-600">Total Users</span>}
              value={1128}
              prefix={<UserOutlined className="text-green-600" />}
              valueStyle={{ color: '#16a34a', fontSize: '28px', fontWeight: 'bold' }}
              suffix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic
              title={<span className="text-gray-600">Active Sessions</span>}
              value={93}
              valueStyle={{ color: '#2563eb', fontSize: '28px', fontWeight: 'bold' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic
              title={<span className="text-gray-600">Revenue</span>}
              value={9280}
              prefix="$"
              valueStyle={{ color: '#16a34a', fontSize: '28px', fontWeight: 'bold' }}
              suffix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic
              title={<span className="text-gray-600">Bounce Rate</span>}
              value={2.7}
              suffix="%"
              valueStyle={{ color: '#dc2626', fontSize: '28px', fontWeight: 'bold' }}
              prefix={<ArrowDownOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="Recent Activity" className="h-full shadow-sm">
            <div className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <Avatar size={45} icon={<UserOutlined />} className="bg-blue-500" />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">User Activity {item}</p>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Quick Actions" className="h-full shadow-sm">
            <div className="space-y-3">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                Add New User
              </button>
              <button className="w-full bg-white hover:bg-gray-50 text-gray-800 font-medium py-3 px-4 rounded-lg border border-gray-300 transition-colors">
                Generate Report
              </button>
              <button className="w-full bg-white hover:bg-gray-50 text-gray-800 font-medium py-3 px-4 rounded-lg border border-gray-300 transition-colors">
                View Analytics
              </button>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DashboardContent;