import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiGrid } from "react-icons/fi";
import './styles/Toolbar.css'

function Toolbar() {
    return (
        <div className="toolbar">
            <Link to="/dashboard" className="toolbar_button">
            <FiGrid className="toolbar_icon"/>Dashboard</Link>
            <Link to="/profile" className="toolbar_button">
            <FiUser className="toolbar_icon"/>Profile</Link>
        </div>
    );
}

export default Toolbar;