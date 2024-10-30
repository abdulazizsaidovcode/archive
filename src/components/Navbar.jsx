// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar ">
            <div className='container'>
                <Link to="/" className="brand">Hujjatlar arxivi</Link>
                <ul className='nav__list mb-0'>
                    <li className='nav__list_item'><Link to="/">Home</Link></li>
                    <li className='nav__list_item'><Link to="/sections">Sections</Link></li>
                    <li className='nav__list_item'><Link to="add/All">all sections</Link></li>
                </ul>
                <Link to="/login">
                    <button className="login-btn">Login</button>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
