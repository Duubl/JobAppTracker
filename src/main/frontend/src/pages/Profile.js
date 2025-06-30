import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './styles/Profile.css';
import { FiUser, FiXSquare } from "react-icons/fi";
import Button from '../components/Button';
import Toolbar from '../components/Toolbar';

function Profile() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Error during logout:', error);
        }
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