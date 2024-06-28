import React, { useState, useEffect } from 'react';
import { Table, Button, Layout, Menu } from 'antd';
import { getStudentBYID } from '../../api/student.api';
import { findCompanyManagerById } from '../../api/company.api';
import { useNavigate, Link } from 'react-router-dom';
import { MenuFoldOutlined, MenuUnfoldOutlined, HomeOutlined, DashboardOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const SuggestedStudentsTable = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('userType');
    if (user === 'student' || user === 'admin') {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const managerId = localStorage.getItem('userId');
        const res = await findCompanyManagerById(managerId);
        const studentIds = res.company.suggested_students;

        const studentsData = await Promise.all(
          studentIds.map(async (id) => {
            const studentRes = await getStudentBYID(id);
            return { id, name: studentRes.data.name };
          })
        );

        setStudents(studentsData);
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleAddInterViews = (id) => {
    navigate(`/add-interviews/${id}`);
  };

  const handleAdd = (id, name) => {
    navigate(`/add-interns/${id}`);
  };

  const columns = [
    {
      title: 'Student Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span style={{ color: '#000000' }}>{text}</span>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <div>
          <Button onClick={() => handleAddInterViews(record.id)} style={{ marginRight: '8px' }}>
            Add for interview
          </Button>
          <Button onClick={() => handleAdd(record.id, record.name)}>Add as intern</Button>
        </div>
      ),
    },
  ];

  const dataSource = students.map((student, index) => ({
    key: index,
    id: student.id,
    name: student.name,
  }));

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
          <Menu.Item key="1" icon={<HomeOutlined />}>
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
            <h2 style={{ color: '#66fcf1', textAlign: 'center', marginBottom: '24px' }}>Suggested Students</h2>
            <Table
              columns={columns}
              dataSource={dataSource}
              loading={loading}
              pagination={false}
              style={{
                backgroundColor: '#444',
                color: '#e0e0e0',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
              className="shadow-lg"
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default SuggestedStudentsTable;
