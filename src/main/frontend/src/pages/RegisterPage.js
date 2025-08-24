import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/Register.css';
import Toast from '../components/Toast';

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('info');
    const navigate = useNavigate();

    // State to track cursor position
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

    // Handle mouse movement over the button
    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setCursorPosition({ x, y });
    };

    // Reset cursor position on mouse leave
    const handleMouseLeave = () => {
        setCursorPosition({ x: 0, y: 0 });
    };

    // Clear toast message
    const handleCloseToast = () => {
        setMessage('');
        setMessageType('info');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');

        // Validate passwords match
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            setMessageType('error');
            return;
        }

        // Validate password length
        if (password.length < 6) {
            setMessage('Password must be at least 6 characters long');
            setMessageType('error');
            return;
        }

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });

            if (response.ok) {
                setMessage('Registration successful! Please sign in.');
                setMessageType('success');
                setTimeout(() => {
                    navigate('/login');
                }, 1500);
            } else {
                const errorData = await response.json();
                setMessage(errorData.message || 'Registration failed');
                setMessageType('error');
            }
        } catch (error) {
            console.error('Registration error:', error);
            setMessage('Registration failed. Please try again.');
            setMessageType('error');
        }
    };

    return (
        <div className="register_page">
            <div className="register_container">
                <form onSubmit={handleSubmit} className="register_form">
                    <h2>Register</h2>
                    <div className="form_group">            
                        <input
                            type="text"
                            id="username"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form_group">
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form_group">
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        style={{
                            '--x': `${cursorPosition.x}px`,
                            '--y': `${cursorPosition.y}px`,
                        }}
                    >
                        Register
                    </button>
                    <p className="login_link">
                        Already have an account? <Link to="/login"><b>Sign In</b></Link>
                    </p>
                </form>
                <Toast message={message} type={messageType} onClose={handleCloseToast} />
            </div>
        </div>
    );
}

export default RegisterPage; 