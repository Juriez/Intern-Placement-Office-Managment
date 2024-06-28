import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UploadComponent() {
  const [cv, setCV] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('userType');
    if (user === 'admin' || user === 'company_manager') {
      navigate('/login');
    }
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!cv) {
      alert('Please select a file before submitting.');
      return;
    }

    const formData = new FormData();
    formData.append('cv', cv);
    const id = localStorage.getItem('userId');
    // const id='6666d50ef0f23b83b9c735c4';

    try {
      const response = await fetch(`http://localhost:3000/students/${id}/cv`, {
        method: 'POST',
        body: formData,
      });
      console.log(response);
      if (response.ok) {
        console.log('Success!!!!');
        navigate('/Stu_dashboard');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload the file. Please try again.');
    }
  };

  const pageStyle = {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  };

  const formStyle = {
    backgroundColor: '#34495e',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
    color: '#ecf0f1',
  };

  const inputStyle = {
    width: '100%',
    margin: '10px 0',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    outline: 'none',
  };

  const buttonStyle = {
    width: '100%',
    padding: '15px',
    backgroundColor: '#1abc9c',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  };

  return (
    <div style={pageStyle}>
      <form id='regForm' className='row g-3 needs-validation' onSubmit={submit} style={formStyle}>
        <input
          required
          type='file'
          accept='application/pdf'
          name='cv'
          className='form-control'
          id='cv'
          onChange={(e) => setCV(e.target.files[0])}
          style={inputStyle}
        />
        <br />
        <button type='submit' style={buttonStyle}>
          Submit
        </button>
      </form>
    </div>
  );
}