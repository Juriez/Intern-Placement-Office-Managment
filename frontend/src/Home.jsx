import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, Typography } from 'antd';
import { Link } from 'react-router-dom';
import backgroundImage from './assets/iit.jpg';  // Corrected path

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

function Home() {
  const [collapsed, setCollapsed] = useState(false);

  const layoutStyle = {
    minHeight: '100vh',
    backgroundColor: '#2c3e50',
  };

  const headerStyle = {
    padding: 0,
    backgroundColor: 'rgba(28, 40, 51, 0.8)',
    display: 'flex',
    alignItems: 'center',
  };

  const buttonStyle = {
    fontSize: '16px',
    width: 64,
    height: 64,
    color: '#ecf0f1',
  };

  const contentStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 64px)',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  const boxStyle = {
    padding: '20px',
    backgroundColor: 'rgba(52, 73, 94, 0.8)', // semi-transparent background
    borderRadius: '35px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
    color: '#ecf0f1',
  };

  const textStyle = {
    fontSize: '45px',
    fontFamily: 'Pacifico, cursive',
    color: '#ecf0f1',
  };

  return (
    <Layout style={layoutStyle}>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ backgroundColor: 'rgba(28, 40, 51, 0.8)' }}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} style={{ backgroundColor: 'rgba(28, 40, 51, 0.8)' }}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/registration-type" className="btn btn-primary">Signup</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/login" className="btn btn-primary">Login</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<MenuFoldOutlined />}>
            <Link to="/about" className="btn btn-primary">About</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={headerStyle}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={buttonStyle}
          />
        </Header>
        <Content style={contentStyle}>
          <div style={boxStyle}>
            <Title level={2} style={textStyle}>Welcome to</Title>
            <h1 style={textStyle}>Intern & Placement Office Management</h1>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Home;
