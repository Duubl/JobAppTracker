import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './styles/Dashboard.css'
import Toolbar from '../components/Toolbar';
import { FiPlus, FiFilter, FiChevronDown } from "react-icons/fi";
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
    const [editingApplication, setEditingApplication] = useState(null);
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [sortBy, setSortBy] = useState('date_applied');
    const [sortDirection, setSortDirection] = useState('desc'); // 'asc' or 'desc'
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [filters, setFilters] = useState({
        city: '',
        state: '',
        status: '',
        remote: ''
    });
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);

    const handleLogout = async () => {
        await logout();
    };

    const handleAddApplication = () => {
        setShowAddMenu(true);
    };

    const handleCloseAddMenu = () => {
        setShowAddMenu(false);
        setEditingApplication(null);
    };

    const handleDeleteApplication = async (application) => {
        try {
            const response = await fetch(`/api/job-applications/delete/${application.id}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (response.ok) {
                setApplications(prevApplications => prevApplications.filter(app => app.id !== application.id));
                setShowAddMenu(false);
                setEditingApplication(null);
                setFocusedApplication(null);
            } else {
                console.error('Failed to delete application');
            }
        } catch (error) {
            console.error('Error deleting application:', error);
        }
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

    // Fetch autocomplete data for filters
    useEffect(() => {
        const fetchAutocompleteData = async () => {
            try {
                const [citiesResponse, statesResponse] = await Promise.all([
                    fetch('/api/job-applications/cities', { credentials: 'include' }),
                    fetch('/api/job-applications/states', { credentials: 'include' })
                ]);

                if (citiesResponse.ok) {
                    const citiesData = await citiesResponse.json();
                    setCities(citiesData);
                }

                if (statesResponse.ok) {
                    const statesData = await statesResponse.json();
                    setStates(statesData);
                }
            } catch (error) {
                console.error('Error fetching autocomplete data:', error);
            }
        };

        fetchAutocompleteData();
    }, []);

    const handleApplicationAdded = (newApplication) => {
        if (editingApplication) {
            // Update existing application
            setApplications(prevApplications => 
                prevApplications.map(app => 
                    app.id === newApplication.id ? newApplication : app
                )
            );
            setEditingApplication(null);
        } else {
            // Add new application
            setApplications(prevApplications => [newApplication, ...prevApplications]);
        }
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

    const handleEditApplication = (application) => {
        setEditingApplication(application);
        setShowAddMenu(true);
        setShowDetailPanel(false);
        setFocusedApplication(null);
    };

    const sortApplications = (apps, sortCriteria, direction) => {
        const sortedApps = [...apps];
        
        switch (sortCriteria) {
            case 'job_title':
                return sortedApps.sort((a, b) => {
                    const result = a.job_title.localeCompare(b.job_title);
                    return direction === 'desc' ? -result : result;
                });
            case 'date_applied':
                return sortedApps.sort((a, b) => {
                    const result = new Date(b.date_applied) - new Date(a.date_applied);
                    return direction === 'desc' ? result : -result;
                });
            case 'state':
                return sortedApps.sort((a, b) => {
                    const result = (a.state || '').localeCompare(b.state || '');
                    return direction === 'desc' ? -result : result;
                });
            case 'city':
                return sortedApps.sort((a, b) => {
                    const result = (a.city || '').localeCompare(b.city || '');
                    return direction === 'desc' ? -result : result;
                });
            case 'status':
                return sortedApps.sort((a, b) => {
                    const result = a.status.localeCompare(b.status);
                    return direction === 'desc' ? -result : result;
                });
            case 'company_name':
                return sortedApps.sort((a, b) => {
                    const result = a.company_name.localeCompare(b.company_name);
                    return direction === 'desc' ? -result : result;
                });
            default:
                return sortedApps;
        }
    };

    const handleSortChange = (newSortBy) => {
        if (sortBy === newSortBy) {
            // Toggle direction if same sort option is selected
            setSortDirection(prevDirection => prevDirection === 'asc' ? 'desc' : 'asc');
        } else {
            // Set new sort option and default to descending for most fields, ascending for dates
            setSortBy(newSortBy);
            setSortDirection(newSortBy === 'date_applied' ? 'desc' : 'asc');
        }
        setShowSortDropdown(false);
    };

    const getSortDisplayName = (sortValue) => {
        const sortNames = {
            'job_title': 'Job Title',
            'date_applied': 'Date Applied',
            'state': 'State',
            'city': 'City',
            'status': 'Status',
            'company_name': 'Company Name'
        };
        const direction = sortDirection === 'asc' ? ' ↑' : ' ↓';
        return (sortNames[sortValue] || sortValue) + direction;
    };

    const filterApplications = () => {
        setShowFilterDropdown(!showFilterDropdown);
    };

    const applyFilters = (apps) => {
        return apps.filter(app => {
            const cityMatch = !filters.city || app.city?.toLowerCase().includes(filters.city.toLowerCase());
            const stateMatch = !filters.state || app.state?.toLowerCase().includes(filters.state.toLowerCase());
            const statusMatch = !filters.status || app.status === filters.status;
            const remoteMatch = !filters.remote || app.isRemote === filters.remote;
            
            return cityMatch && stateMatch && statusMatch && remoteMatch;
        });
    };

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };

    const clearFilters = () => {
        setFilters({
            city: '',
            state: '',
            status: '',
            remote: ''
        });
    };

    const getActiveFiltersCount = () => {
        return Object.values(filters).filter(value => value !== '').length;
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showSortDropdown && !event.target.closest('.sort_dropdown')) {
                setShowSortDropdown(false);
            }
            if (showFilterDropdown && !event.target.closest('.filter_dropdown')) {
                setShowFilterDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showSortDropdown, showFilterDropdown]);

    return (
        <div className="dashboard">
            <Toolbar/>
            <div className="dashboard_listings_container">
                <div className="dashboard_listings_header">
                    <h2>Job Applications</h2>
                    <div className="dashboard_controls">
                        <div className="sort_dropdown">
                            <Button onClick={() => setShowSortDropdown(!showSortDropdown)}>
                                Sort by: {getSortDisplayName(sortBy)} <FiChevronDown className="button_icon" />
                            </Button>
                            {showSortDropdown && (
                                <div className="sort_dropdown_menu">
                                    <button 
                                        onClick={() => handleSortChange('job_title')}
                                        className={sortBy === 'job_title' ? 'active' : ''}
                                    >
                                        Job Title {sortBy === 'job_title' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
                                    </button>
                                    <button 
                                        onClick={() => handleSortChange('company_name')}
                                        className={sortBy === 'company_name' ? 'active' : ''}
                                    >
                                        Company Name {sortBy === 'company_name' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
                                    </button>
                                    <button 
                                        onClick={() => handleSortChange('date_applied')}
                                        className={sortBy === 'date_applied' ? 'active' : ''}
                                    >
                                        Date Applied {sortBy === 'date_applied' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
                                    </button>
                                    <button 
                                        onClick={() => handleSortChange('state')}
                                        className={sortBy === 'state' ? 'active' : ''}
                                    >
                                        State {sortBy === 'state' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
                                    </button>
                                    <button 
                                        onClick={() => handleSortChange('city')}
                                        className={sortBy === 'city' ? 'active' : ''}
                                    >
                                        City {sortBy === 'city' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
                                    </button>
                                    <button 
                                        onClick={() => handleSortChange('status')}
                                        className={sortBy === 'status' ? 'active' : ''}
                                    >
                                        Status {sortBy === 'status' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="filter_dropdown">
                            <Button onClick={filterApplications}>
                                <FiFilter className="button_icon"/>
                                Filter {getActiveFiltersCount() > 0 ? `(${getActiveFiltersCount()})` : ''}
                                <FiChevronDown className="button_icon" />
                            </Button>
                            {showFilterDropdown && (
                                <div className="filter_dropdown_menu">
                                    <div className="filter_section">
                                        <label>City:</label>
                                        <input 
                                            type="text" 
                                            placeholder="Filter by city..."
                                            value={filters.city}
                                            onChange={(e) => handleFilterChange('city', e.target.value)}
                                            list="filter-cities-list"
                                        />
                                        <datalist id="filter-cities-list">
                                            {cities.map((cityOption, index) => (
                                                <option key={index} value={cityOption} />
                                            ))}
                                        </datalist>
                                    </div>
                                    <div className="filter_section">
                                        <label>State:</label>
                                        <input 
                                            type="text" 
                                            placeholder="Filter by state..."
                                            value={filters.state}
                                            onChange={(e) => handleFilterChange('state', e.target.value)}
                                            list="filter-states-list"
                                        />
                                        <datalist id="filter-states-list">
                                            {states.map((stateOption, index) => (
                                                <option key={index} value={stateOption} />
                                            ))}
                                        </datalist>
                                    </div>
                                    <div className="filter_section">
                                        <label>Status:</label>
                                        <select 
                                            value={filters.status}
                                            onChange={(e) => handleFilterChange('status', e.target.value)}
                                        >
                                            <option value="">All Statuses</option>
                                            <option value="APPLIED">Applied</option>
                                            <option value="SCREENING">Screening</option>
                                            <option value="INTERVIEWING">Interviewing</option>
                                            <option value="OFFER_RECEIVED">Offer Received</option>
                                            <option value="REJECTED">Rejected</option>
                                            <option value="WITHDRAWN">Withdrawn</option>
                                            <option value="HIRED">Hired</option>
                                        </select>
                                    </div>
                                    <div className="filter_section checkbox_section">
                                        <label>
                                            <input 
                                                type="checkbox" 
                                                checked={filters.remote === true}
                                                onChange={(e) => handleFilterChange('remote', e.target.checked ? true : '')}
                                            />
                                            Remote Jobs Only
                                        </label>
                                    </div>
                                    {getActiveFiltersCount() > 0 && (
                                        <div className="filter_actions">
                                            <button onClick={clearFilters} className="clear_filters_btn">
                                                Clear Filters
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <Button onClick={handleAddApplication}> 
                            <FiPlus className="button_icon"/>Add Application
                        </Button>
                    </div>
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
                            sortApplications(applyFilters(applications), sortBy, sortDirection).map((application) => (
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
                                onEditApplication={handleEditApplication}
                            />
                        </div>
                    )}
                    </div>
                </div>
            </div>
            {showAddMenu && (
                <AddApplicationMenu 
                    onClose={handleCloseAddMenu} 
                    onApplicationAdded={handleApplicationAdded}
                    initialData={editingApplication}
                    isEditing={!!editingApplication}
                    onDelete={handleDeleteApplication}
                />
            )}
        </div>
    );
}

export default Dashboard;