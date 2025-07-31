import React from 'react';
import './styles/JobApplication.css';

function JobApplication({ job_title, company_name, state, city, date_applied, status, isRemote, onClick }) {
    const getStatusColors = (status) => {
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
    
    return (
        <div className="job_application" onClick={onClick}>
            <div className="job_application_header">
                <h2>{job_title}</h2>
                <div className="date_applied">{date_applied}</div></div>
            <div className="company_info">
                <div className="company_name">{company_name}</div>
                <div className="location">
                    {isRemote ? 'Remote' : `${city}, ${state}`}
                </div>
            </div>
            <div className="status" style={{ color: getStatusColors(status) }}>{status}</div>
        </div>
    );
}

export default JobApplication;