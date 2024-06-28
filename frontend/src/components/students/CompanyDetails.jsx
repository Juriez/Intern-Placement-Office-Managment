import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Layout, Button } from 'antd';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const companyDetails = {
  cefalo: {
    technologies: ['JavaScript', 'React', 'Node.js'],
    functionality: 'Software Development, IT Consultancy',
  },
  'brain-station': {
    technologies: ['Python', 'Django', 'React Native'],
    functionality: 'Mobile and Web Development, Data Science',
  },
  samsung: {
    technologies: ['C++', 'Java', 'Kotlin'],
    functionality: 'Electronics, Software Development',
  },
  a2i: {
    technologies: ['PHP', 'Laravel', 'Vue.js'],
    functionality: 'Government Services, Digital Transformation',
  },
  // Add more company details as needed
};

const CompanyDetail = () => {
  const { companyId } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate hook
  const company = companyDetails[companyId] || {};

  const handleBackToDashboard = () => {
    navigate('/Stu_dashboard');
  };

  return (
    <Layout style={{ minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <Content style={{ width: '50%', padding: '24px', background: '#fff', borderRadius: '8px' }}>
        <Title level={2}>{companyId.replace(/-/g, ' ')}</Title>
        <Title level={4}>Technologies</Title>
        <Paragraph>{company.technologies?.join(', ') || 'N/A'}</Paragraph>
        <Title level={4}>Functionality</Title>
        <Paragraph>{company.functionality || 'N/A'}</Paragraph>
        <Button type="primary" onClick={handleBackToDashboard} style={{ marginTop: '20px' }}>
          Back to Dashboard
        </Button>
      </Content>
    </Layout>
  );
};

export default CompanyDetail;
