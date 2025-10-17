import { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import DashboardContent from './pages/DashboardContent';
import UsersContent from './pages/UsersContent';
import SettingsContent from './pages/SettingsContent';
import Footer from './Footer';

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('1');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      onClick: () => setSelectedMenu('3'),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
      danger: true,
    },
  ];

  const menuItems = [
    {
      key: '1',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '2',
      icon: <UserOutlined />,
      label: 'Users',
    },
  ];

  const renderContent = () => {
    switch (selectedMenu) {
      case '1':
        return <DashboardContent />;
      case '2':
        return <UsersContent />;
      default:
        return <DashboardContent />;
    }
  };

  const getPageTitle = () => {
    switch (selectedMenu) {
      case '1':
        return 'Dashboard';
      case '2':
        return 'Users';
      case '3':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };

  return (
   <div>
     <Layout className="min-h-screen flex flex-col">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        collapsedWidth="0"
        className="bg-gray-900"
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="h-16 flex items-center justify-center text-white text-xl border-b border-gray-800 font-thick">
          {collapsed ? 'TA' : 'Turbo Admin'}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedMenu]}
          items={menuItems}
          onClick={({ key }) => setSelectedMenu(key)}
          className="bg-gray-900 border-r-0"
        />
      </Sider>

      <Layout style={{ marginLeft: collapsed ? 0 : 200 }} className="transition-all duration-200 flex flex-col">
        <Header className="bg-white shadow-md px-6 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="text-xl p-2 rounded-lg transition-colors lg:hidden"
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </button>
            <h2 className="text-xl font-semibold text-gray-800 hidden sm:block text-white">
              {getPageTitle()}
            </h2>
          </div>
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <div className="flex items-center gap-3 cursor-pointer cursor-pointer px-3 py-2 rounded-lg transition-colors">
              <Avatar icon={<UserOutlined />} className="bg-blue-600" />
              <span className="font-medium hidden sm:inline text-white">{user?.username}</span>
            </div>
          </Dropdown>
        </Header>

        <Content className="m-4 sm:m-6 flex-1">
          <div className="bg-gray-50 p-4 sm:p-6 rounded-lg h-full">
            {renderContent()}
          </div>
        </Content>

      </Layout>
    </Layout>
    <div className='fixed bottom-0 w-full'>
        <Footer />
    </div>
   </div>
  );
};

export default Dashboard;