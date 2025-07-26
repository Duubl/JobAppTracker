import React, { useState, useEffect } from 'react';
import './styles/ApplicationMenu.css';
import Button from './Button';

function AddApplicationMenu({ onClose, onApplicationAdded }) {
    const [jobTitle, setJobTitle] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [dateApplied, setDateApplied] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [isRemote, setIsRemote] = useState(false);
    const [status, setStatus] = useState('APPLIED');
    
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        const fetchAutocompleteData = async () => {
            try {
                const [citiesResponse, statesResponse, companiesResponse] = await Promise.all([
                    fetch('/api/job-applications/cities', { credentials: 'include' }),
                    fetch('/api/job-applications/states', { credentials: 'include' }),
                    fetch('/api/job-applications/companies', { credentials: 'include' })
                ]);

                if (citiesResponse.ok) {
                    const citiesData = await citiesResponse.json();
                    setCities(citiesData);
                }

                if (statesResponse.ok) {
                    const statesData = await statesResponse.json();
                    setStates(statesData);
                }

                if (companiesResponse.ok) {
                    const companiesData = await companiesResponse.json();
                    setCompanies(companiesData);
                }
            } catch (error) {
                console.error('Error fetching autocomplete data:', error);
            }
        };

        fetchAutocompleteData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted, starting submission process...');
        
        // Check if all required fields are filled
        if (!jobTitle || !jobDescription || !companyName || !dateApplied || !city || !state) {
            console.error('Missing required fields:', {
                jobTitle: !!jobTitle,
                jobDescription: !!jobDescription,
                companyName: !!companyName,
                dateApplied: !!dateApplied,
                city: !!city,
                state: !!state
            });
            alert('Please fill in all required fields');
            return;
        }
        
        try {
            const applicationData = {
                job_title: jobTitle,
                description: jobDescription,
                company_name: companyName,
                date_applied: dateApplied,
                city: city,
                state: state,
                isRemote: isRemote,
                status: status
            };

            console.log('Application data to send:', applicationData);

            const url = '/api/job-applications/add';
            console.log('Making request to:', url);

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(applicationData)
            });

            console.log('Response status:', response.status);
            console.log('Response ok:', response.ok);

            if (response.ok) {
                const newApplication = await response.json();
                console.log('New application received:', newApplication);
                if (onApplicationAdded) {
                    console.log('Calling onApplicationAdded callback');
                    onApplicationAdded(newApplication);
                }
                if (onClose) {
                    console.log('Calling onClose callback');
                    onClose();
                }
            } else {
                const errorText = await response.text();
                console.error('Failed to add application. Status:', response.status, 'Response:', errorText);
                // TODO: Add error handling/notification
            }
        } catch (error) {
            console.error('Error adding application:', error);
            // TODO: Add error handling/notification
        }
    };

    return (
        <div className="application_menu">
            <div className="application_container">
                <form onSubmit={(e) => {
                    console.log('Form onSubmit triggered');
                    handleSubmit(e);
                }} className="application_form">
                    <div className="form_header">
                        <button type="button" onClick={onClose} className="close_button">×</button>
                    </div>
                    <div className="form_group">
                        <label htmlFor="job_title">Job Title</label>
                        <input 
                        type="text" 
                        id="job_title" 
                        name="job_title" 
                        placeholder="Job Title"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        required />
                    </div>
                    <div className="form_group">
                        <label htmlFor="job_description">Job Description</label>
                        <textarea 
                        id="job_description" 
                        name="job_description" 
                        placeholder="Job Description"
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        required />
                    </div>
                    <div className="form_group">
                        <label htmlFor="company_name">Company Name</label>
                        <input 
                        type="text" 
                        id="company_name" 
                        name="company_name" 
                        placeholder="Company Name"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        list="companies-list"
                        required />
                        <datalist id="companies-list">
                            {companies.map((company, index) => (
                                <option key={index} value={company} />
                            ))}
                        </datalist>
                    </div>
                    <div className="form_group">
                        <label htmlFor="date_applied">Date Applied</label>
                        <input 
                        type="date" 
                        id="date_applied" 
                        name="date_applied" 
                        value={dateApplied}
                        onChange={(e) => setDateApplied(e.target.value)}
                        required />
                    </div>
                    <div className="form_group">
                        <label htmlFor="city">City</label>
                        <input 
                        type="text" 
                        id="city" 
                        name="city" 
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        list="cities-list"
                        required />
                        <datalist id="cities-list">
                            {cities.map((cityOption, index) => (
                                <option key={index} value={cityOption} />
                            ))}
                        </datalist>
                    </div>
                    <div className="form_group">
                        <label htmlFor="state">State</label>
                        <input 
                        type="text" 
                        id="state" 
                        name="state" 
                        placeholder="State"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        list="states-list"
                        required />
                        <datalist id="states-list">
                            {states.map((stateOption, index) => (
                                <option key={index} value={stateOption} />
                            ))}
                        </datalist>
                    </div>
                    <div className="form_group checkbox_group">
                        <label htmlFor="is_remote">Remote</label>
                        <input 
                        type="checkbox" 
                        id="is_remote" 
                        name="is_remote" 
                        checked={isRemote}
                        onChange={(e) => setIsRemote(e.target.checked)}/>
                    </div>
                    <div className="form_group">
                        <label htmlFor="status">Status</label>
                        <select 
                            id="status" 
                            name="status" 
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required>
                            <option value="APPLIED">Applied</option>
                            <option value="SCREENING">Screening</option>
                            <option value="INTERVIEWING">Interviewing</option>
                            <option value="OFFER_RECEIVED">Offer Received</option>
                            <option value="REJECTED">Rejected</option>
                            <option value="WITHDRAWN">Withdrawn</option>
                            <option value="HIRED">Hired</option>
                        </select>
                    </div>
                    <div className="form_group">
                        <Button type="submit">Save Changes</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddApplicationMenu;