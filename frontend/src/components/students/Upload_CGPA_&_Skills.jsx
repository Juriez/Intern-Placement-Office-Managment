import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Select, Layout, Typography } from 'antd';
import { getAllCompany } from '../../api/ipoc.api';
import { skillSetUpload } from '../../api/student.api';

const { Content } = Layout;
const { Option } = Select;
const { Title } = Typography;

const UploadCGPAAndSkillset = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate(); 
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem('userType');
    if (user === 'admin' || user === 'company_manager') {
      navigate('/login');
    }

    const fetchCompanies = async () => {
      try {
        const response = await getAllCompany();
        setCompanies(response.data);
      } catch (error) {
        console.error('Failed to fetch companies:', error);
      }
    };

    fetchCompanies();
  }, [navigate]);

  const onFinish = async (values) => {
    const stuId = localStorage.getItem('userId');
    try {
      const res = await skillSetUpload(values, stuId);
      console.log(res, "jasssenda");
      navigate('/Stu_dashboard'); 
      form.resetFields();
    } catch (err) {
      console.error(err);
    }
  };

  const validateCGPA = (_, value) => {
    if (value && value > 4.0) {
      return Promise.reject(new Error('CGPA must not be more than 4.00'));
    }
    return Promise.resolve();
  };

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#2c3e50', justifyContent: 'center', alignItems: 'center' }}>
      <Content style={{ width: '50%', padding: '24px', background: '#34495e', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' }}>
        <Title level={2} style={{ textAlign: 'center', color: '#ecf0f1' }}>Upload CGPA, Skillset, & Prefered Company</Title>
        <Form
          form={form}
          name="upload_cgpa_and_skillset"
          onFinish={onFinish}
          layout="vertical"
          initialValues={{ skills: [] }}
        >
          <Form.Item
            name="cgpa"
            label="CGPA"
            rules={[
              { required: true, message: 'Please input your CGPA!' },
              { validator: validateCGPA },
            ]}
          >
            <Input placeholder="Enter your CGPA" type="number" step="0.01" style={{ borderRadius: '4px' }} />
          </Form.Item>
          <Form.Item
            name="skills"
            label="Skillset"
            rules={[{ required: true, message: 'Please select your skillset!' }]}
          >
            <Select
              mode="multiple"
              placeholder="Select your skills"
              style={{ width: '100%', borderRadius: '4px' }}
            >
              <Option value="React">React</Option>
              <Option value="JavaScript">JavaScript</Option>
              <Option value="CSS">CSS</Option>
              <Option value="HTML">HTML</Option>
              <Option value="Node.js">Node.js</Option>
              <Option value="Python">Python</Option>
              <Option value="Java">Java</Option>
              <Option value="C">C</Option>
              <Option value="C++">C++</Option>
              <Option value="C#">C#</Option>
              <Option value="MongoDb">MongoDb</Option>
              <Option value="Mysql">Mysql</Option>
              <Option value="Express.js">Express.js</Option>
              <Option value="PHP">PHP</Option>
              <Option value="Angular">Angular</Option>
              <Option value="TypeScript">TypeScript</Option>
              <Option value="Vue.js">Vue.js</Option>
              <Option value="Kotlin">Kotlin</Option>
              <Option value="Laravel">Laravel</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="preferred_companies"
            label="Preferred Company"
            rules={[{ required: true, message: 'Please select your preferred companies!' }]}
          >
            <Select
              placeholder="Select your preferred only companies not multiple"
              style={{ width: '100%', borderRadius: '4px' }}
            >
              {companies.map((company) => (
                <Option key={company._id} value={company._id}>
                  {company.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%', borderRadius: '4px', backgroundColor: '#1abc9c', borderColor: '#1abc9c' }}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default UploadCGPAAndSkillset;
