import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link component
import './LoginPage.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Login attempt with:', email, password);
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h2>Spirit11 Login</h2>
                <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Login</button>
 
                <div className="signup-link">  
                   {/* Add a prompt for users to sign up */}

                    Don't have an account? <Link to="/signup">Create Account</Link>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;
