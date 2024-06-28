import { useEffect, useState } from 'react';
import { Modal, Select, message } from 'antd';
import { getAllCompany, suggestStudent } from '../../api/ipoc.api';

const { Option } = Select;

// eslint-disable-next-line react/prop-types
const CompanyModal = ({ studentId, visible, onClose }) => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await getAllCompany();
        console.log(response);
        setCompanies(response.data);
      } catch (error) {
        console.error('Failed to fetch companies:', error);
      }
    };

    fetchCompanies();
  }, []);

  const handleCompanyChange = async (value) => {
    setSelectedCompany(value);
    setLoading(true);
    try {
      const response = await suggestStudent(studentId, value);
      // Process the response as needed
      console.log('Suggested students:', response.data);
      message.success('Students Referred successfully!');
    } catch (error) {
      console.error('Failed to Refer students:', error);
      message.error('Failed to Refer students');
    } finally {
      setLoading(false);
    }
  };

  const handleOk = () => {
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      title='Select Company'
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={loading}
    >
      <Select
        style={{ width: '100%' }}
        placeholder='Select a company'
        onChange={handleCompanyChange}
        value={selectedCompany._id}
      >
        {companies.map((company) => (
          <Option key={company._id} value={company._id}>
            {company.name}
          </Option>
        ))}
      </Select>
    </Modal>
  );
};

export default CompanyModal;