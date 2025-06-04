import React, { useState } from 'react';
import './styles/Login.css';
import Toast from '../components/Toast';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('info');

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
        setCursorPosition({ x: 0, y: 0 }); // Optional: Reset to avoid persistent gradient
    };

    // Clear message
    const handleCloseToast = () => {
        setMessage('');
        setMessageType('info');
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission which reloads the page
        setMessage(''); // Clear previous messages

        try {
            // Use the relative path. The proxy (configured in package.json or vite.config.js)
            // will forward this to http://localhost:8080/api/login during development.
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                    const data = await response.json();
                    setMessage(`Login Successful! Welcome ${data.email + '!' || ''}`);
                    setMessageType('success');
                    console.log('Login successful:', data);
                } else {
                    let errorMsg = `Login Failed: ${response.statusText}`;
                    try {
                    const errorData = await response.json();
                    errorMsg = `Login Failed: ${errorData.message || response.statusText}`;
                    } catch (e) {
                    // Ignore if response body is not JSON
                    }
                    setMessage(errorMsg);
                    setMessageType('error');
                    console.error('Login failed:', response.status, response.statusText);
                }
                } catch (error) {
                setMessage('Login Failed: Network error or server unavailable.');
                setMessageType('error');
                console.error('Network error:', error);
                }
            };

    return (
        <div className="login_container">
            <form onSubmit={handleSubmit} className="login_form">
                <h2>Sign In</h2>
                <div className="form_group">            
                    <input
                        type="text"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
    );
}

export default LoginPage;