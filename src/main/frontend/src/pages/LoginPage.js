import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './styles/Login.css';
import Toast from '../components/Toast';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('info');
    const navigate = useNavigate();
    const { login } = useAuth();

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

        const result = await login(username, password);

        if (result.success) {
            setMessage(`Login successful! Welcome ${username}!`);
            setMessageType('success');
            setTimeout(() => {
                navigate('/dashboard');
            }, 1200);
        } else {
            setMessage(result.message || 'Login Failed');
            setMessageType('error');
        }
    };

    return (
        <div className="login_page">
            <div className="login_container">
                <form onSubmit={handleSubmit} className="login_form">
                    <h2>Sign In</h2>
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
                    <button
                        type="submit"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        style={{
                            '--x': `${cursorPosition.x}px`,
                            '--y': `${cursorPosition.y}px`,
                        }}
                    >
                        Login
                    </button>
                    <p className="register_link">
                        Don&apos;t have an account? <b>Register</b>
                    </p>
                </form>
                <Toast message={message} type={messageType} onClose={handleCloseToast} />
            </div>
        </div>
    );
}

export default LoginPage;