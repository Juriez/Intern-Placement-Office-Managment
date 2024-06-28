import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { studentSignUp } from "../../api/authentication.api";

function StudentSignup() {
    const { type } = useParams();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [roll, setRoll] = useState("");
    const [session, setSession] = useState("");
    const [cgpa, setCgpa] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        const bsseEmailPattern = /^bsse\d+@iit.du.ac.bd$/;

        if (!name) newErrors.name = "Name is required.";
        if (!email) {
            newErrors.email = "Email is required.";
        } else if (!bsseEmailPattern.test(email)) {
            newErrors.email = "Email must be a valid BSSE email (e.g., bsse1316@iit.du.ac.bd).";
        }
        if (!password) {
            newErrors.password = "Password is required.";
        } else if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters long.";
        }
        if (!roll) newErrors.roll = "Roll is required.";
        if (!session) newErrors.session = "Session is required.";
        if (!cgpa) newErrors.cgpa = "CGPA is required.";

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
                roll,
                session,
                cgpa
            };
            
            try {
                const response = await studentSignUp(data);
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
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="roll" style={labelStyle}>Roll</label>
                        <input
                            type="text"
                            placeholder="Enter Roll"
                            autoComplete="off"
                            name="roll"
                            style={inputStyle}
                            onChange={(e) => setRoll(e.target.value)}
                        />
                        {errors.roll && <div className="text-danger">{errors.roll}</div>}
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="session" style={labelStyle}>Session</label>
                        <input
                            type="text"
                            placeholder="Enter Session"
                            autoComplete="off"
                            name="session"
                            style={inputStyle}
                            onChange={(e) => setSession(e.target.value)}
                        />
                        {errors.session && <div className="text-danger">{errors.session}</div>}
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="cgpa" style={labelStyle}>CGPA</label>
                        <input
                            type="text"
                            placeholder="Enter CGPA"
                            autoComplete="off"
                            name="cgpa"
                            style={inputStyle}
                            onChange={(e) => setCgpa(e.target.value)}
                        />
                        {errors.cgpa && <div className="text-danger">{errors.cgpa}</div>}
                    </div>
                    <button type="submit" className="btn btn-success rounded-0" style={buttonStyle}>
                        Register
                    </button>
                </form>
                {errors.api && <div className="text-danger mt-3">{errors.api}</div>}
                <p>Already have an account?</p>
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

export default StudentSignup;