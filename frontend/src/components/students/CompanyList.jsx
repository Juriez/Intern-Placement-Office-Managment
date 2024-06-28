/* eslint-disable react/no-unknown-property */
import React, { useEffect, useState } from 'react';
import { Table, Typography, Layout, Menu, Button } from 'antd';
import { DashboardOutlined, MenuFoldOutlined, MenuUnfoldOutlined,HomeOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { showCompany } from '../../api/student.api';

const { Content, Sider, Header } = Layout;
const { Title } = Typography;

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanyList = async () => {
      try {
        const response = await showCompany();
        setCompanies(response.data);
      } catch (error) {
        console.error('Failed to fetch company list:', error);
      }
    };

    fetchCompanyList();
  }, []);

  useEffect(() => {
    const user = localStorage.getItem('userType');
    if (user === 'admin' || user === 'company_manager') {
      navigate('/login');
    }
  }, [navigate]);

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: 'id',
      render: (text) => <Typography.Text strong style={{ color: '#1a1a1a' }}>{text}</Typography.Text>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <Typography.Text strong style={{ color: '#1a1a1a' }}>{text}</Typography.Text>,
    },
  ];
  

  const layoutStyle = {
    minHeight: '100vh',
    backgroundColor: '#1f2833',
  };

  const headerStyle = {
    padding: 0,
    backgroundColor: '#1c2833',
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
    backgroundColor: '#1f2833', // Adjusted background color
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
  };

  return (
    <Layout style={layoutStyle}>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ backgroundColor: '#1c2833' }}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} style={{ backgroundColor: '#1c2833' }}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<DashboardOutlined />}>
          <Link to="/studentdashboard">Back to Dashboard</Link>
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
          <div style={{ width: '100%' }}>
            <Title level={2} style={{ color: '#66fcf1', textAlign: 'center', marginBottom: '24px' }}>
              Company List
            </Title>
            <Table
              columns={columns}
              dataSource={companies}
              rowKey='_id'
              pagination={false}
              style={{ background: '#1f2833' }}
              bordered
              rowClassName={(record, index) =>
                index % 2 === 0 ? 'even-row' : 'odd-row'
              }
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default CompanyList;