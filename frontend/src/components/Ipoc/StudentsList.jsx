import React, { useState, useEffect } from 'react';
import { Table, Dropdown, Menu, Button, Modal, Layout, Typography } from 'antd';
import { EllipsisOutlined, DashboardOutlined,HomeOutlined } from '@ant-design/icons';
import { viewStudentList } from '../../api/ipoc.api';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import SuggestStudent from './SuggestStudent';

const { Header, Sider, Content } = Layout;


const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [ModalVisible, setModalVisible] = useState(false);
  const [isCVModalVisible, setIsCVModalVisible] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await viewStudentList();
        setStudents(response);
      } catch (error) {
        console.error('Failed to fetch student list:', error);
      }
    };

    fetchStudents();
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('userType');
    if (user === 'student' || user === 'company_manager') {
      navigate('/login');
    }
  }, [navigate]);

  const handleDownload = (student) => {
    setIsCVModalVisible(true);
    if (student.cvUrl) {
      fetchPdf(student.cvUrl);
    }
  };

  const fetchPdf = async (cvUrl) => {
    try {
      const response = await axios.get(`http://localhost:3000/${cvUrl}`, {
        responseType: 'blob',
      });
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setPdfUrl(pdfUrl);
    } catch (error) {
      console.error('Failed to fetch PDF:', error);
    }
  };

  const handleSuggestStudent = (studentId) => {
    setSelectedStudentId(studentId);
    setModalVisible(true);
  };

  const menu = (record) => (
    <Menu>
      <Menu.Item key='download' onClick={() => handleDownload(record)}>
        Download CV
      </Menu.Item>
      <Menu.Item key='suggest' onClick={() => handleSuggestStudent(record._id)}>
        Suggest Student
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span style={{ color: '#000000' }}>{text}</span>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text) => <span style={{ color: '#000000' }}>{text}</span>,
    },
    {
      title: 'Roll',
      dataIndex: 'roll',
      key: 'roll',
      render: (text) => <span style={{ color: '#000000' }}>{text}</span>,
    },
    {
      title: 'Session',
      dataIndex: 'session',
      key: 'session',
      render: (text) => <span style={{ color: '#000000' }}>{text}</span>,
    },
    {
      title: 'CGPA',
      dataIndex: 'cgpa',
      key: 'cgpa',
      render: (text) => <span style={{ color: '#000000' }}>{text}</span>,
    },
    {
      title: 'Skills',
      dataIndex: 'skills',
      key: 'skills',
      render: (skills) => (
        <span style={{ color: '#000000' }}>{skills.join(', ')}</span>
      ),
    },
    {
      title: 'Preferred Companies',
      dataIndex: 'preferred_companies',
      key: 'preferred_companies',
      render: (preferredCompanies) => (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {preferredCompanies?.map((company) => (
            <li key={company._id}>
              <span style={{ color: '#000000' }}>{company.name}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Suggested Companies',
      dataIndex: 'suggested_companies',
      key: 'suggested_companies',
      render: (suggestedCompanies) => (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {suggestedCompanies.map((company) => (
            <li key={company._id}>
              <span style={{ color: '#000000' }}>{company.name}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Call for Interview',
      dataIndex: 'call_for_interview',
      key: 'call_for_interview',
      render: (callForInterview) => (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {callForInterview.map((company) => (
            <li key={company._id}>
              <span style={{ color: '#000000' }}>{company.company.name}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Selected Company',
      dataIndex: 'selected_company',
      key:'selected_company',
      render: (selectedCompany) => (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {selectedCompany.map((selectedCompany) => (
            <li key={selectedCompany._id}>
              <span style={{ color: '#000000' }}>{selectedCompany.company.name}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Dropdown overlay={menu(record)} trigger={['click']}>
          <Button shape='circle' icon={<EllipsisOutlined />} />
        </Dropdown>
      ),
    },
  ];
  

  const containerStyle = {
    fontFamily: 'Arial, sans-serif',
    color: '#f0f0f0',
    lineHeight: '1.6',
    padding: '20px',
    backgroundColor: '#2c3e50', // Adjusted background color
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
  };

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#2c3e50' }}>
      <Sider trigger={null} collapsible collapsed={false} style={{ background: '#1c2833' }}>
        <div style={{ height: '32px', margin: '16px', background: 'rgba(255, 255, 255, 0.2)', textAlign: 'center', lineHeight: '32px', color: 'white' }}>
          Logo
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ backgroundColor: '#1c2833' }}
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<DashboardOutlined />}>
            <Link to="/ipoc-dashboard">Back to Dashboard</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: '#1c2833',
          }}
        >
          <Button
            type="text"
            onClick={() => {}}
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
            background: '#2c3e50',
            borderRadius: 3,
          }}
        >
          <div style={containerStyle}>
            <Table
              columns={columns}
              dataSource={students}
              rowKey='_id'
              className='shadow-lg rounded-md'
            />
            <Modal
              title='Student CV'
              open={isCVModalVisible}
              onCancel={() => setIsCVModalVisible(false)}
              footer={null}
              width='80%'
              bodyStyle={{ height: '80vh' }}
            >
              {pdfUrl && <iframe src={pdfUrl} width='100%' height='100%' />}
            </Modal>
            <SuggestStudent
              studentId={selectedStudentId}
              visible={ModalVisible}
              onClose={() => setModalVisible(false)}
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default StudentList;