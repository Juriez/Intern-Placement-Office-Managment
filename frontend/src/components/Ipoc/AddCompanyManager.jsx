import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Layout, Typography, Menu } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, DashboardOutlined } from '@ant-design/icons';
import { addCompanyManager } from '../../api/ipoc.api';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const AddCompanyList = () => {
  const [form] = Form.useForm();
  const [companies, setCompanies] = useState([]);
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('userType');
    if (user === 'student' || user === 'company_manager') {
      navigate('/login');
    }
  }, [navigate]);

  const onFinish = async (values) => {
    try {
      const response = await addCompanyManager(values);
      console.log(response);
      setCompanies([...companies, values]);
      form.resetFields();
    } catch (err) {
      console.log(err);
    }
  };

  const containerStyle = {
    fontFamily: 'Arial, sans-serif',
    color: '#f0f0f0',
    lineHeight: '1.6',
    padding: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
  };

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#1f2833' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ background: '#0b0c10' }}>
        <div style={{ height: '32px', margin: '16px', background: 'rgba(255, 255, 255, 0.2)', textAlign: 'center', lineHeight: '32px', color: 'white' }}>
          Logo
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<DashboardOutlined />}>
            <Link to="/ipoc-dashboard">Back to Dashboard</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: '#0b0c10' }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
              color: 'white',
            }}
          />
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280, background: '#1f2833', borderRadius: '8px' }}>
          <div style={containerStyle}>
            <Title level={2} style={{ textAlign: 'center', marginBottom: '24px', color: '#66fcf1' }}>Add Company Manager</Title>
            <Form form={form} name="add_company_list" onFinish={onFinish} layout="vertical">
              <Form.Item
                name="name"
                label={<span style={{ color: 'white' }}>Name</span>}
                rules={[{ required: true, message: 'Please input the name!' }]}
              >
                <Input placeholder="Enter name" />
              </Form.Item>
              <Form.Item
                name="email"
                label={<span style={{ color: 'white' }}>Email</span>}
                rules={[{ required: true, message: 'Please input the email!' }]}
              >
                <Input placeholder="Enter email" />
              </Form.Item>
              <Form.Item
                name="password"
                label={<span style={{ color: 'white' }}>Password</span>}
                rules={[{ required: true, message: 'Please input the password!' }]}
              >
                <Input.Password placeholder="Enter password" />
              </Form.Item>
              <Form.Item
                name="companyName"
                label={<span style={{ color: 'white' }}>Company Name</span>}
                rules={[{ required: true, message: 'Please input the company name!' }]}
              >
                <Input placeholder="Enter company name" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                  Add Company Manager
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AddCompanyList;
