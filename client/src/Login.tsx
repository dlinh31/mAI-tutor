import React, { useState, FormEvent, ChangeEvent } from 'react';

interface LoginProps {
    // You can add props here if needed, for example, a function to handle login
}

const Login: React.FC<LoginProps> = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const handleLogin = async () => {
            try {
                const response = await fetch('http://localhost:3000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: email, password: password }),
                });

                if (response.ok) {
                    const data = await response.json();
                    const jwt = data.token;
                    if (jwt) {
                        localStorage.setItem('jwt', jwt);
                        console.log('Login successful');
                        window.location.href = '/chatbot/quiz';
                    } else {
                        console.log('JWT not found in response headers');
                    }
                } else {
                    // Handle failed login
                    console.log('Login failed');
                }
                
            } catch (error) {
                console.error('Error occurred during login:', error);
            }
        };
        handleLogin();
    };

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="w-full max-w-xs p-8 space-y-6 bg-white rounded shadow-md">
                <div>
                    <label htmlFor="email" className="block text-sm font-bold text-gray-700">
                        Email
                    </label>
                    <input
                        id="email"
                        type="text"
                        value={email}
                        onChange={handleEmailChange}
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        placeholder=""
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-bold text-gray-700">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        placeholder=""
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    >
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
