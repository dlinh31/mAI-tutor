import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/userContext';

const Navbar = () => {
    const [buttonState, setButtonState] = useState(false); // False means Hamburger & True means X
    const { user, logout } = useUser();

    const toggleButtonState = () => {
        setButtonState(!buttonState);
    };

    return (
        <nav className="bg-white shadow-md relative">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center py-3 md:py-4">
                    <div className="text-lg md:text-xl font-bold text-gray-800">
                        <Link to="/">SWE1</Link>
                    </div>
                    <div className="hidden md:flex space-x-4">
                        <Link to="/" className="text-base md:text-lg text-gray-600 hover:text-gray-800">Home</Link>
                        <Link to="/chat" className="text-base md:text-lg text-gray-600 hover:text-gray-800">Chat</Link>
                        {user ? (
                            <button onClick={logout} className="py-2 px-4 text-white bg-red-500 rounded-md hover:bg-red-600">
                                Log Out
                            </button>
                        ) : (
                            <Link to="/login" className="py-2 px-4 text-white bg-green-500 rounded-md hover:bg-green-600">Sign In</Link>
                        )}
                    </div>
                    <button onClick={toggleButtonState} className={`hamburger md:hidden ${buttonState ? 'open' : ''}`}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={buttonState ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div className={`md:hidden ${buttonState ? 'flex' : 'hidden'} flex-col items-center absolute w-full bg-white shadow-md py-4 mt-4`}>
                <Link to="/" className="py-2 text-gray-700 hover:bg-gray-50 w-full text-center">Home</Link>
                <Link to="/login" className="py-2 text-gray-700 hover:bg-gray-50 w-full text-center">Sign In</Link>
            </div>
        </nav>
    );
};

export default Navbar;
