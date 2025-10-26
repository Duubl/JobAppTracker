import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLoading } from '../context/LoadingContext';
import { useNavigate } from 'react-router-dom';
import './styles/Profile.css';
import { FiUser, FiXSquare, FiTrash, FiAlertTriangle } from "react-icons/fi";
import Button from '../components/Button';
import Toolbar from '../components/Toolbar';

function Profile() {
    const { user, logout } = useAuth();
    const { showLoading, hideLoading } = useLoading();
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState('');

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

    const requiredText = "I want to delete my account, I understand all my applications will be lost.";
    
    const openDeleteModal = () => {
        setShowDeleteModal(true);
        setDeleteConfirmation('');
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setDeleteConfirmation('');
    };

    const confirmDeleteAccount = async () => {
        if (deleteConfirmation.trim() === requiredText) {
            setShowDeleteModal(false);
            showLoading('Deleting account...');
            try {
                const response = await fetch('/api/auth/delete', {
                    method: 'DELETE',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                hideLoading();
                
                if (response.ok) {
                    alert('Account deleted successfully');
                    await logout();
                    navigate('/login');
                } else {
                    const errorData = await response.json();
                    alert('Failed to delete account: ' + errorData.message);
                }
            } catch (error) {
                hideLoading();
                console.error('Error during deletion:', error);
                alert('An error occurred while deleting your account. Please try again.');
            }
            setDeleteConfirmation('');
        } else {
            alert('Please type the exact phrase to confirm deletion.');
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
                    <Button onClick={openDeleteModal}
                    variant="red">
                        <FiTrash className="button_icon"/>
                        Delete Account
                    </Button>
                </div>
            </div>

            {showDeleteModal && (
                <div className="delete_modal_overlay">
                    <div className="delete_modal">
                        <div className="delete_modal_header">
                            <FiAlertTriangle className="alert_icon"/>
                            <h3>Delete Account</h3>
                        </div>
                        <div className="delete_modal_content">
                            <p className="warning_text">
                                This action cannot be undone. All your job applications and data will be permanently deleted.
                            </p>
                            <p className="confirmation_text">
                                To confirm, please type the following:
                            </p>
                            <div className="required_text_box">
                                <p>{requiredText}</p>
                            </div>
                            <input
                                type="text"
                                placeholder="Type the text above to confirm"
                                value={deleteConfirmation}
                                onChange={(e) => setDeleteConfirmation(e.target.value)}
                                className="confirmation_input"
                            />
                        </div>
                        <div className="delete_modal_actions">
                            <Button onClick={closeDeleteModal}>
                                Cancel
                            </Button>
                            <Button 
                                onClick={confirmDeleteAccount} 
                                variant="red"
                                disabled={deleteConfirmation.trim() !== requiredText}
                            >
                                Delete Account
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;