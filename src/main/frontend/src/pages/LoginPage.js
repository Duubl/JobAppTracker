import React, { useState } from 'react';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); // To display success/error messages

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
                const data = await response.json(); // Or response.text() if backend sends plain text
                setMessage(`Login Successful! Welcome ${data.email || ''}`); // Adjust based on backend response
                // TODO: Handle successful login (e.g., store token, redirect user)
                console.log("Login successful:", data);
            } else {
                // Try to get error message from backend response body
                let errorMsg = `Login Failed: ${response.statusText}`;
                try {
                    const errorData = await response.json(); // Or response.text()
                    errorMsg = `Login Failed: ${errorData.message || response.statusText}`;
                } catch (e) {
                    // Ignore if response body is not JSON or empty
                }
                setMessage(errorMsg);
                console.error("Login failed:", response.status, response.statusText);
            }
        } catch (error) {
            setMessage('Login Failed: Network error or server unavailable.');
            console.error("Network error:", error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {message && <p style={{ color: message.startsWith('Login Failed') ? 'red' : 'green' }}>{message}</p>}
        </div>
    );
}

export default LoginPage;