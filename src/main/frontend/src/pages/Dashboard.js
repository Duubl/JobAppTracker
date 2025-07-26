import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './styles/Dashboard.css'
import Toolbar from '../components/Toolbar';
import { FiPlus } from "react-icons/fi";
import Button from '../components/Button';
import JobApplication from '../components/JobApplication';
import AddApplicationMenu from '../components/ApplicationMenu';

function Dashboard() {
    const { user, logout } = useAuth();
    const [showAddMenu, setShowAddMenu] = useState(false);

    const handleLogout = async () => {
        await logout();
    };

    const handleAddApplication = () => {
        setShowAddMenu(true);
    };

    const handleCloseAddMenu = () => {
        setShowAddMenu(false);
    };

    return (
        <div className="dashboard">
            <Toolbar/>
            <div className="dashboard_listings_container">
                <div className="dashboard_listings_header">
                    <h2>Job Applications</h2>
                    <Button onClick={handleAddApplication}> 
                        <FiPlus className="button_icon"/>Add Application
                    </Button>
                </div>
                <div className="dashboard_listings">
                    <div className="dashboard_listings_content">
                        <JobApplication 
                        job_title="Software Engineer" 
                        company_name="Google" 
                        city="Mountain View" 
                        state="California" 
                        date_applied="2024-01-01" 
                        status="Applied" 
                        isRemote={false} />
                        <JobApplication 
                        job_title="Frontend Developer" 
                        company_name="Microsoft" 
                        city="" 
                        state="" 
                        date_applied="2024-01-15" 
                        status="Interviewing" 
                        isRemote={true} />
                    </div>
                </div>
            </div>
            {showAddMenu && (
                <AddApplicationMenu onClose={handleCloseAddMenu} />
            )}
        </div>
    );
}

export default Dashboard;