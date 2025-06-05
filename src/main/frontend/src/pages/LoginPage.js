import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/Login.css';
import Toast from '../components/Toast';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('info');
    const navigate = useNavigate();

    // State to track cursor position
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

    // Handle mouse movement over the button
    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left; // Cursor x relative to button
        const y = e.clientY - rect.top; // Cursor y relative to button
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

        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);

            const response = await fetch('/api/login', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(`Login successful! Welcome ${data.username || 'User'}!`);
                setMessageType('success');
                console.log('Login successful:', data);
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1200);
            } else {
                const errorData = await response.json();
                setMessage(errorData.message || 'Login Failed');
                setMessageType('error');
                console.error('Login failed:', response.status, response.statusText);
            }
            } catch (error) {
            setMessage('Login failed: Network error or server unavailable.');
            setMessageType('error');
            console.error('Network error:', error);
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