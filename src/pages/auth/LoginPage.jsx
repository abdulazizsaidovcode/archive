import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();

        const loginData = {
            username: email,
            password: password,
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                
                const data = await response.json();
                console.log(data);
                
                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);
                toast.success('Login successful!');
                navigate('/sections')// Asosiy sahifaga o'tish
            } else {
                setError('Login failed. Please check your credentials.');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="container-xxl">
            <div className="authentication-wrapper authentication-basic container-p-y">
                <div className="authentication-inner">
                    <div className="">
                        <div className="card-body justify-content-start">
                            <h4 className="mb-2">Welcome back👋</h4>
                            <p className="mb-4">Please sign-in to your account and start the adventure</p>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={handleLogin}>
                                <div className="mb-3 d-flex flex-column align-items-start"> 
                                    <label htmlFor="email" className="form-labe text-al">Email or Username</label>
                                    <input
                                        type="phone"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email or username"
                                        required
                                        autoFocus
                                    />
                                </div>
                                <div className="mb-3 d-flex flex-column align-items-start">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <button className="btn btn-primary text-white d-grid w-100" type="submit">Sign in</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
