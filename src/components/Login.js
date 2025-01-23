import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "./Dashboard";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://bionic-backend-7v9q.onrender.com/users/verify', {
            // const response = await fetch('http://localhost:3001/users/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();

            if (data.data.token) {
                localStorage.setItem('token', data.data.token);
                navigate('/home');
            } else {
                setError('Invalid login credentials');
            }
        } catch (err) {
            setError('Login failed');
        }
    };

    return (
        <>
            <Header userName={'to Bionic'} />
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg w-96">
                    <h1 className="text-2xl mb-6">Login</h1>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};
