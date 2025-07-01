import React from 'react';
import './styles/JobApplication.css';

function JobApplication({ job_title, company_name, company_location, date_applied, status }) {
    return (
        <div className="job_application">
            <div className="job_application_header">
                <h2>{job_title}</h2>
                <div className="date_applied">{date_applied}</div></div>
            <div className="company_info">
                <div className="company_name">{company_name}</div>
                <div className="company_location">{company_location}</div>
            </div>
            <div className="status">{status}</div>
        </div>
    );
}

export default JobApplication;