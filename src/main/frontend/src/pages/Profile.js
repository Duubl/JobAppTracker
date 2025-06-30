import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLoading } from '../context/LoadingContext';
import { useNavigate } from 'react-router-dom';
import './styles/Profile.css';
import { FiUser, FiXSquare } from "react-icons/fi";
import Button from '../components/Button';
import Toolbar from '../components/Toolbar';

function Profile() {
    const { user, logout } = useAuth();
    const { showLoading, hideLoading } = useLoading();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        const confirmed = window.confirm('Are you sure you want to sign out?');
        
        if (confirmed) {
            showLoading('Signing out...');
            try {
                await logout();
                hideLoading();
                navigate('/login');
            } catch (error) {
                console.error('Error during logout:', error);
                hideLoading();
            }
        }
    };

    // Test function for loading screen
    const testLoading = () => {
        showLoading('Testing loading screen...');
        setTimeout(() => {
            hideLoading();
        }, 3000); // Hide after 3 seconds
    };

    return (
        <div className="profile">
            <Toolbar/>
            <div className="profile_container">
                <div className="profile_info">
                    <div className="profile_icon_container">
                        <FiUser className="profile_icon"/>
                    </div>
                    <h2>{user?.username}</h2>
                    <Button onClick={handleSignOut}>
                        <FiXSquare className="button_icon"/>
                        Sign Out
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Profile;