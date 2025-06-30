import React from 'react';
import { useAuth } from '../context/AuthContext';
import './styles/Dashboard.css'
import Toolbar from '../components/Toolbar';
import { FiPlus } from "react-icons/fi";

function Dashboard() {
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
    };

    return (
        <div className="dashboard">
            <Toolbar onLogout={handleLogout} />
            <div className="dashboard_listings_container">
                <div className="dashboard_listings">
                    <div className="dashboard_listings_header">
                        <h2>Job Applications</h2>
                        <div className="dashboard_button"> 
                            <FiPlus className="button_icon"/>Add Application
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;