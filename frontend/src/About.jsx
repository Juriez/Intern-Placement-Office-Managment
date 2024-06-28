import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Link } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const About = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const containerStyle = {
    fontFamily: 'Arial, sans-serif',
    color: '#f0f0f0',
    lineHeight: '1.6',
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: borderRadiusLG,
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
  };

  const headerStyle = {
    textAlign: 'center',
    color: '#66fcf1',
    marginBottom: '20px',
  };

  const sectionStyle = {
    marginBottom: '20px',
  };

  const subheaderStyle = {
    color: '#45a29e',
    fontSize: '1.2em',
    marginBottom: '10px',
  };

  const listStyle = {
    listStyleType: 'disc',
    paddingLeft: '20px',
  };

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#1f2833' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ background: '#0b0c10' }}>
        <div style={{ height: '32px', margin: '16px', background: 'rgba(255, 255, 255, 0.2)', textAlign: 'center', lineHeight: '32px', color: 'white' }}>
          Logo
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/login">Login</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: '#0b0c10',
          }}
        >
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
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: '#1f2833',
            borderRadius: borderRadiusLG,
          }}
        >
          <div style={containerStyle}>
            <h1 style={headerStyle}>About Our Internship Management System</h1>

            <div style={sectionStyle}>
              <h2 style={subheaderStyle}>Overview</h2>
              <p>
                Our Internship Management System is designed to streamline the process of allocating 4th year BSSE students to reputed software companies for their semester-long internships, starting from 1st January to 30th June every year.
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={subheaderStyle}>IPO Committee (IPOC)</h2>
              <p>
                The Internship and Placement Office (IPO) is managed by a committee (IPOC) consisting of three members, led by the IPO head. The IPO head is responsible for enlisting new companies interested in taking interns.
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={subheaderStyle}>Company Enrollment</h2>
              <p>
                Companies express their interest in taking interns by contacting the IPO head. An IPOC member then records the company’s details including available positions, job responsibilities, company address, and HR’s email.
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={subheaderStyle}>Student Application</h2>
              <p>
                Students are informed to upload their CVs and provide their skillsets, CGPA, and company preferences. Based on this information, IPOC members suggest a list of students to the IPO head who then allocates students for interviews.
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={subheaderStyle}>Interview Process</h2>
              <p>
                After allocation, an admit card with a specific interview date and time is generated on the student dashboard. Students and IPOC can track the status of each stage on their dashboards.
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={subheaderStyle}>Selection and Offer</h2>
              <p>
                Post-interview, companies notify students of their selection status via email. A formal selection letter is generated and sent to the company's HR and the IPOC officer. The company then issues offer letters to the selected interns.
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={subheaderStyle}>System Features</h2>
              <ul style={listStyle}>
                <li>Streamlined internship allocation process</li>
                <li>Automated admit card generation</li>
                <li>Real-time status tracking on dashboards</li>
                <li>Automated email notifications</li>
                <li>Formal selection and offer letter generation</li>
              </ul>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default About;
