import React from 'react';
import { FiX, FiMapPin, FiCalendar, FiBriefcase, FiFileText, FiEdit } from 'react-icons/fi';
import './styles/ApplicationDetailPanel.css';
import Button from './Button';

function ApplicationDetailPanel({ application, onClose, onEditApplication }) {
    if (!application) return null;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getStatusColor = (status) => {
        const statusColors = {
            'APPLIED': '#2196F3',
            'SCREENING': '#FF9800',
            'INTERVIEWING': '#9C27B0',
            'OFFER_RECEIVED': '#4CAF50',
            'REJECTED': '#F44336',
            'WITHDRAWN': '#757575',
            'HIRED': '#4CAF50'
        };
        return statusColors[status] || '#666';
    };

    const handleEditClick = () => {
        if (onEditApplication) {
            onEditApplication(application);
        }
    };

    return (
        <div className="application_detail_panel">
            <div className="detail_header">
                <h2>Application Details</h2>
                <button onClick={onClose} className="close_button">
                    <FiX />
                </button>
            </div>
            
            <div className="detail_content">
                <div className="detail_section">
                    <h3 className="job_title">{application.job_title}</h3>
                    <p className="company_name">{application.company_name}</p>
                </div>

                <div className="detail_section">
                    <div className="detail_item">
                        <FiMapPin className="detail_icon" />
                        <span className="detail_label">Location:</span>
                        <span className="detail_value">
                            {application.isRemote ? 'Remote' : `${application.city}, ${application.state}`}
                        </span>
                    </div>
                    
                    <div className="detail_item">
                        <FiCalendar className="detail_icon" />
                        <span className="detail_label">Date Applied:</span>
                        <span className="detail_value">{formatDate(application.date_applied)}</span>
                    </div>
                    
                    <div className="detail_item">
                        <FiBriefcase className="detail_icon" />
                        <span className="detail_label">Status:</span>
                        <span 
                            className="detail_value status_badge"
                            style={{ backgroundColor: getStatusColor(application.status) }}
                        >
                            {application.status.replace('_', ' ')}
                        </span>
                    </div>
                </div>

                {application.description && (
                    <div className="detail_section">
                        <div className="detail_item">
                            <FiFileText className="detail_icon" />
                            <span className="detail_label">Description:</span>
                        </div>
                        <div className="description_content">
                            {application.description}
                        </div>
                    </div>
                )}

                <div className="detail_section">
                    <Button onClick={handleEditClick} className="edit_button">
                        <FiEdit className="button_icon" />
                        Edit Application
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ApplicationDetailPanel; 