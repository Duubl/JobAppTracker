import React from 'react';
import { useAuth } from '../context/AuthContext';
import './styles/Dashboard.css'
import Toolbar from '../components/Toolbar';
import { FiPlus } from "react-icons/fi";
import Button from '../components/Button';
import JobApplication from '../components/JobApplication';

function Dashboard() {
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
    };

    return (
        <div className="dashboard">
            <Toolbar/>
            <div className="dashboard_listings_container">
                <div className="dashboard_listings_header">
                    <h2>Job Applications</h2>
                    <Button> 
                        <FiPlus className="button_icon"/>Add Application
                    </Button>
                </div>
                <div className="dashboard_listings">
                    <div className="dashboard_listings_content">
                        <JobApplication job_title="Software Engineer" company_name="Google" company_location="Mountain View, CA" date_applied="2024-01-01" status="Applied" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;