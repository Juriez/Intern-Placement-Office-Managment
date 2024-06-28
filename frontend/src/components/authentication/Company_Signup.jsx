import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { companySignUp } from "../../api/authentication.api";

function CompanySignup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};

        if (!name) newErrors.name = "Name is required.";
        if (!email) {
            newErrors.email = "Email is required.";
        }
        if (!password) {
            newErrors.password = "Password is required.";
        } else if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters long.";
        }

        if (!companyName) {
            newErrors.companyName = "Company name is required.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            const data = {
                name,
                email,
                password,
                companyName
            };
            
            try {
                const response = await companySignUp(data);
                console.log(response);
                navigate('/login'); // Redirect to login page after successful registration
            } catch (err) {
                console.error(err);
                setErrors({ api: "Failed to register. Please try again." });
            }
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

    const labelStyle = {
        color: '#45a29e',
        marginBottom: '5px',
    };

    const inputStyle = {
        width: '100%',
        padding: '8px',
        marginBottom: '10px',
        border: '1px solid #45a29e',
        borderRadius: '4px',
        backgroundColor: '#0b0c10',
        color: '#f0f0f0',
    };

    const buttonStyle = {
        backgroundColor: '#007bff',
        borderColor: '#007bff',
        color: '#fff',
        width: '100%',
        padding: '8px',
        borderRadius: '4px',
        marginTop: '10px',
    };

    const linkStyle = {
        display: 'block',
        width: '100%',
        textAlign: 'center',
        textDecoration: 'none',
        backgroundColor: '#343a40',
        color: '#66fcf1',
        padding: '8px',
        borderRadius: '4px',
        marginTop: '10px',
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ backgroundColor: '#1f2833', minHeight: '100vh' }}>
            <div style={containerStyle}>
                <h2 style={headerStyle}>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="name" style={labelStyle}>Name</label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            autoComplete="off"
                            name="name"
                            style={inputStyle}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && <div className="text-danger">{errors.name}</div>}
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="email" style={labelStyle}>Email</label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            style={inputStyle}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <div className="text-danger">{errors.email}</div>}
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="companyName" style={labelStyle}>Company Name</label>
                        <input
                            type="text"
                            placeholder="Company Name"
                            autoComplete="off"
                            name="companyName"
                            style={inputStyle}
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                        {errors.companyName && <div className="text-danger">{errors.companyName}</div>}
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="password" style={labelStyle}>Password</label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            autoComplete="off"
                            name="password"
                            style={inputStyle}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <div className="text-danger">{errors.password}</div>}
                    </div>
                    <button type="submit" className="btn btn-success rounded-0" style={buttonStyle}>
                        Register
                    </button>
                </form>
                {errors.api && <div className="text-danger mt-3">{errors.api}</div>}
                <Link to="/login" style={linkStyle}>
                    Login
                </Link>
                {/* <Link to="/forgot-password" className="btn btn-link" style={{ display: 'block', textAlign: 'center', marginTop: '10px', color: '#66fcf1' }}>
                    Forgot Password?
                </Link> */}
            </div>
        </div>
    );
}

export default CompanySignup;