import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Select, Layout, Typography, Table } from 'antd';
import { useCompanyContext } from './CompanyContext'; // Import the context


const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const AddCompanyDetail = () => {
  const [form] = Form.useForm();
  const { addCompanyDetail, companies } = useCompanyContext(); // Use the context
  const navigate = useNavigate(); 
  const handleBackToDashboard = () => {
    navigate('/ipocdashboard');
  };


  useEffect(() => {

    const user = localStorage.getItem('userType');
    if (user == 'student' || user == 'company_manager') {
      navigate('/login');
    }
  }, []);

  const onFinish = (values) => {
    const { companyName, technologies, functionalities } = values;
    addCompanyDetail({ companyName, technologies, functionalities });
    form.resetFields();
  };

  const columns = [
    {
      title: 'Company Name',
      dataIndex: 'companyName',
      key: 'companyName',
    },
    {
      title: 'Technologies',
      dataIndex: 'technologies',
      key: 'technologies',
      render: (technologies) => technologies.join(', '),
    },
    {
      title: 'Functionalities',
      dataIndex: 'functionalities',
      key: 'functionalities',
      render: (functionalities) => functionalities.join(', '),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <Content style={{ width: '50%', padding: '24px', background: '#fff', borderRadius: '8px' }}>
        <Title level={2}>Add Company Detail</Title>
        <Form form={form} name="add_company_detail" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="companyName"
            label="Company Name"
            rules={[{ required: true, message: 'Please input the company name!' }]}
          >
            <Input placeholder="Enter company name" />
          </Form.Item>
          <Form.Item
            name="technologies"
            label="Technologies"
            rules={[{ required: true, message: 'Please select technologies!' }]}
          >
            <Select mode="multiple" placeholder="Select technologies" style={{ width: '100%' }}>
              <Option value="JavaScript">JavaScript</Option>
              <Option value="React">React</Option>
              <Option value="Node.js">Node.js</Option>
              <Option value="Python">Python</Option>
              <Option value="Django">Django</Option>
              <Option value="Java">Java</Option>
              <Option value="Kotlin">Kotlin</Option>
              <Option value="PHP">PHP</Option>
              <Option value="Laravel">Laravel</Option>
              <Option value="Vue.js">Vue.js</Option>
              {/* Add more technologies as needed */}
            </Select>
          </Form.Item>
          <Form.Item
            name="functionalities"
            label="Functionalities"
            rules={[{ required: true, message: 'Please select functionalities!' }]}
          >
            <Select
              mode="multiple"
              placeholder="Select functionalities"
              style={{ width: '100%' }}
            >
              <Option value="Software Development">Software Development</Option>
              <Option value="IT Consultancy">IT Consultancy</Option>
              <Option value="Mobile and Web Development">Mobile and Web Development</Option>
              <Option value="Data Science">Data Science</Option>
              <Option value="Electronics">Electronics</Option>
              <Option value="Digital Transformation">Digital Transformation</Option>
              <Option value="Government Services">Government Services</Option>
              {/* Add more functionalities as needed */}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Add Details
            </Button>
          </Form.Item>
        </Form>
        <div style={{ marginTop: '24px' }}>
          <Title level={4}>Current Companies</Title>
          <Table
            dataSource={companies}
            columns={columns}
            rowKey="companyName"
            pagination={false}
          />
        </div>

        <Button type="primary" onClick={handleBackToDashboard} style={{ marginTop: '20px' }}>
          Back to Dashboard
        </Button>
      </Content>
    </Layout>
  );
};

export default AddCompanyDetail;
