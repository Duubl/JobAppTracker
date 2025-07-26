import React from 'react';
import './styles/JobApplication.css';

function JobApplication({ job_title, company_name, state, city, date_applied, status, isRemote, onClick }) {
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
            <div className="status">{status}</div>
        </div>
    );
}

export default JobApplication;