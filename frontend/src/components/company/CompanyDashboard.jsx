import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  UnorderedListOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Layout, Menu, Typography } from 'antd';
import dashboardImage from '../../assets/dashboardIP.jpg';
import backgroundImage from '../../assets/iit.jpg'; // Import your background image here

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

const items = [
  {
    key: '2',
    icon: <UnorderedListOutlined />,
    label: 'View Suggested Students',
    linkTo: '/suggested-interns',
  },
  {
    key: '3',
    icon: <LogoutOutlined />,
    label: 'Logout',
    linkTo: '/logout',
  },
];

const CompanyDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('userType');
    if (user === 'student' || user === 'admin') {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear localStorage
    localStorage.clear();

    // Clear cookies
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    // Redirect to login page
    navigate('/login');
  };

  const contentStyle = {
    backgroundImage: `url(${backgroundImage})`, // Set the background image for Content
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: 'calc(100vh - 64px)', // Adjusting height for the Content
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px', // Padding inside the Content
  };

  const boxStyle = {
    maxWidth: '600px', // Limiting box width for a smaller size
    padding: '40px', // Padding inside the box
    backgroundColor: '#34495e', // Box background color
    borderRadius: '35px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
    color: '#ecf0f1',
    backgroundImage: `url(${dashboardImage})`, // Set background image for the box
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };

  const textStyle = {
    fontSize: '65px',
    fontFamily: 'Pacifico, cursive',
    color: '#ecf0f1',
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{ backgroundColor: '#1c2833' }}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['2']} mode="inline">
          {items.map((item) => (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              onClick={item.key === '3' ? handleLogout : null}
            >
              {item.linkTo ? (
                <Link to={item.linkTo}>{item.label}</Link>
              ) : (
                <span>{item.label}</span>
              )}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }} />
        <Content style={contentStyle}>
          <div style={boxStyle}>
            <Title level={3} style={textStyle}>Dear company authority,</Title>
            <p style={{ fontSize: '16px', color: '#ecf0f1' }}>
              Welcome to your dashboard. Here you can view the suggested students for the interview according to IPOC,
              and from those students, you can take all or some of them as interns for your company.
            </p>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center', backgroundColor: '#1c2833', color: '#ecf0f1' }}>IPOM</Footer>
      </Layout>
    </Layout>
  );
};

export default CompanyDashboard;
