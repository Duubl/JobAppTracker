import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './styles/Dashboard.css'
import Toolbar from '../components/Toolbar';
import { FiPlus } from "react-icons/fi";
import Button from '../components/Button';
import JobApplication from '../components/JobApplication';
import AddApplicationMenu from '../components/ApplicationMenu';
import ApplicationDetailPanel from '../components/ApplicationDetailPanel';

function Dashboard() {
    const { user, logout } = useAuth();
    const [showAddMenu, setShowAddMenu] = useState(false);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [focusedApplication, setFocusedApplication] = useState(null);
    const [showDetailPanel, setShowDetailPanel] = useState(false);

    const handleLogout = async () => {
        await logout();
    };

    const handleAddApplication = () => {
        setShowAddMenu(true);
    };

    const handleCloseAddMenu = () => {
        setShowAddMenu(false);
    };

    // Fetch user's applications
    useEffect(() => {
        const fetchApplications = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/job-applications/user-applications', {
                    credentials: 'include'
                });
                
                if (response.ok) {
                    const data = await response.json();
                    setApplications(data);
                } else {
                    setError('Failed to fetch applications!');
                }
            } catch (error) {
                console.error('Error fetching applications:', error);
                setError('Error loading applications!');
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    const handleApplicationAdded = (newApplication) => {
        setApplications(prevApplications => [newApplication, ...prevApplications]);
        setShowAddMenu(false);
    };

    const handleApplicationClick = (application) => {
        setFocusedApplication(application);
        // Delay showing the detail panel until after job applications finish resizing
        setTimeout(() => {
            setShowDetailPanel(true);
        }, 300);
    };

    const handleCloseDetailPanel = () => {
        setFocusedApplication(null);
        setShowDetailPanel(false);
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
                    <div className={`dashboard_listings_content ${focusedApplication ? 'focused' : ''}`}>
                        {loading ? (
                            <div className="loading_message">Loading applications...</div>
                        ) : error ? (
                            <div className="error_message">{error}</div>
                        ) : applications.length === 0 ? (
                            <div className="no_applications_message">No applications yet. Click "Add Application" to get started!</div>
                        ) : (
                            applications.map((application) => (
                                <JobApplication
                                    key={application.id}
                                    job_title={application.job_title}
                                    company_name={application.company_name}
                                    city={application.city}
                                    state={application.state}
                                    date_applied={application.date_applied}
                                    status={application.status}
                                    isRemote={application.isRemote}
                                    onClick={() => handleApplicationClick(application)}
                                />
                            ))
                        )}
                        {showDetailPanel && focusedApplication && (
                        <div className="dashboard_detail_panel">
                            <ApplicationDetailPanel 
                                application={focusedApplication} 
                                onClose={handleCloseDetailPanel} 
                            />
                        </div>
                    )}
                    </div>
                </div>
            </div>
            {showAddMenu && (
                <AddApplicationMenu onClose={handleCloseAddMenu} onApplicationAdded={handleApplicationAdded} />
            )}
        </div>
    );
}

export default Dashboard;