import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileOutlined,
  UploadOutlined,
  UnorderedListOutlined,
  LogoutOutlined,
  InfoCircleOutlined, // Import the new icon
} from '@ant-design/icons';
import { Layout, Menu, Typography, Modal, Button } from 'antd';
import dashboardImage from '../../assets/dashboardIP.jpg';
import InternStatus from './internStatus';
import { getStudentBYID } from '../../api/student.api';
import backgroundImage from '../../assets/iit.jpg'; // Import your background image here

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

const items = [
  {
    key: '1',
    icon: <FileOutlined />,
    label: 'Upload CV',
    linkTo: '/upload',
  },
  {
    key: '2',
    icon: <UploadOutlined />,
    label: 'Upload Skills & Preferred Company',
    linkTo: '/UploadSkillset',
  },
  {
    key: '3',
    icon: <UnorderedListOutlined />,
    label: 'Company List',
    linkTo: '/companyList',
  },
  {
    key: '5',
    icon: <InfoCircleOutlined />,
    label: 'My Status',
  },
  {
    key: '4',
    icon: <LogoutOutlined />,
    label: 'Logout',
    linkTo: '/logout',
  },
];

const StudentDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility
  const navigate = useNavigate();
  const [allocatedCompany, setAllocatedCompany] = useState();

  useEffect(() => {
    const user = localStorage.getItem('userType');
    if (user === 'admin' || user === 'company_manager') {
      navigate('/login');
    }
    const fetchStudent = async () => {
      try {
        const studentId = localStorage.getItem('userId');
        const res = await getStudentBYID(studentId);
        setAllocatedCompany(res.data.selected_company[0].company.name);
      } catch (error) {
        console.log('Error fetching students:', error);
      }
    };

    fetchStudent();
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

  const handleMenuClick = (key) => {
    if (key === '4') {
      handleLogout();
    } else if (key === '5') {
      setIsModalVisible(true); // Show the modal
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false); // Hide the modal
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
    textAlign: 'center',
    color: '#ecf0f1',
  };

  const textStyle = {
    fontSize: '65px',
    fontFamily: 'Pacifico, cursive',
    color: '#ecf0f1',
  };

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#2c3e50' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={{ backgroundColor: '#1c2833' }}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          {items.map((item) => (
            <Menu.Item key={item.key} icon={item.icon} onClick={() => handleMenuClick(item.key)}>
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
          <div style={{
            ...boxStyle,
            backgroundImage: `url(${dashboardImage})`, 
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}>
            <Title level={3} style={textStyle}>Dear student, </Title>
            <p style={{ fontSize: '16px', color: '#ecf0f1' }}>Welcome to your dashboard. Here you can upload your CV and see the company list.</p>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center', backgroundColor: '#1c2833', color: '#ecf0f1' }}>IPOM</Footer>
        <InternStatus
          visible={isModalVisible}
          onClose={handleCloseModal}
          modalText={allocatedCompany}
        />
      </Layout>
    </Layout>
  );
};

export default StudentDashboard;
