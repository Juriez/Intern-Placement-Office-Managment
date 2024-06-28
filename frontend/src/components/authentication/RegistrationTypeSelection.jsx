import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Select } from 'antd';
import 'tailwindcss/tailwind.css';

const { Option } = Select;

function RegistrationTypeSelection() {
    const [registrationType, setRegistrationType] = useState('');
    const navigate = useNavigate();

    const handleSelectChange = (value) => {
        setRegistrationType(value);
    };

    const handleProceed = () => {
        if (registrationType) {
            navigate(`/${registrationType}_register`);
        }
    };

    const containerStyle = {
        fontFamily: 'Arial, sans-serif',
        color: '#f0f0f0',
        lineHeight: '1.6',
        padding: '20px',
        maxWidth: '400px',
        margin: '0 auto',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
    };

    const headerStyle = {
        textAlign: 'center',
        color: '#66fcf1',
        marginBottom: '20px',
    };

    const buttonStyle = {
        backgroundColor: '#007bff',
        borderColor: '#007bff',
        color: '#fff',
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ backgroundColor: '#1f2833', minHeight: '100vh' }}>
            <div style={containerStyle}>
                <h2 style={headerStyle}>Choose Registration Type</h2>
                <Select
                    className="w-full"
                    placeholder="Select a registration type"
                    onChange={handleSelectChange}
                    size="large"
                    style={{ marginBottom: '1rem' }}
                >
                    <Option value="student">Student</Option>
                    <Option value="ipoc">IPOC</Option>
                    <Option value="company">Company</Option>
                </Select>
                <div className="mt-4">
                    <button
                        onClick={handleProceed}
                        className="btn btn-primary w-full"
                        style={buttonStyle}
                        disabled={!registrationType}
                    >
                        Proceed
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RegistrationTypeSelection;